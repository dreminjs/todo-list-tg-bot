import { Conversation } from "@grammyjs/conversations";
import { Context, InlineKeyboard } from "grammy";
import { mainActionsKeyboard } from "../app/shared/keyboards/main-actions.keyboard";
import { findMany as findManyLists } from "../list";
import { createOne, findMany, updateOne } from "./todo.service";

export async function createTodoConvo(convo: Conversation, ctx: Context) {
  const telegramId = ctx.chat?.id;

  if (!telegramId) return;

  const lists = await convo.external(() => findManyLists({
    where:{
      user:{
        telegramId,
      }
    }
  }));

  const listsInlineKeyboard = new InlineKeyboard();

  lists.forEach((el) => listsInlineKeyboard.text(el.name, el.id).row().row())

  await ctx.reply("choose list", {
    reply_markup: listsInlineKeyboard.row().text("exit","convo:exit"),
  });

  const {
    callbackQuery: { data: listIdCallbackQueryAnswer },
  } = await convo.waitForCallbackQuery([...lists.map((el) => el.id)]);

  await ctx.reply(`Write Todo!`);

  const {
    message: todo,
    msgId: messageId,
    chatId,
  } = await convo.waitFor(":text");

  if (!todo?.text || !listIdCallbackQueryAnswer) return;

  const createdTodo = await convo.external(() =>
    createOne({
      content: todo.text,
      list: {
        connect: {
          id: listIdCallbackQueryAnswer,
        },
      },
    }),
  );

  await Promise.all([
    ctx.api.setMessageReaction(chatId, messageId, [
      { type: "emoji", emoji: "👍" },
    ]),
    ctx.reply(`${createdTodo.content} - Added! `, {
      reply_parameters: {
        message_id: messageId,
      },
    }),
  ]);

  await ctx.reply("Choose Action", {
    reply_markup: mainActionsKeyboard,
  });
}

export async function findManyTodoConvo(convo: Conversation, ctx: Context) {
  const telegramId = ctx.chat?.id;

  if (!telegramId) return;

  const lists = await convo.external(() => findManyLists({
    where:{
      user:{
        telegramId
      }
    }
  }));

  const listsInlineKeyboard = new InlineKeyboard();

  lists.forEach((list) => listsInlineKeyboard.text(list.name, list.id).row())

  await ctx.reply("choose list", {
    reply_markup: listsInlineKeyboard.text("exit","convo:exit"),
  });

  const {
    callbackQuery: { data: listIdCallbackQueryAnswer },
  } = await convo.waitForCallbackQuery([...lists.map((el) => el.id)]);

  const todos = await findMany({
    where: {
      list: {
        id: listIdCallbackQueryAnswer,
      },
    },
  });

  const todosInlineKeyboard = new InlineKeyboard();

  todos.forEach((todo) =>
    todosInlineKeyboard.text(todo.content.padStart(50), todo.id).row(),
  );

  await ctx.reply("choose todo for action", {
    reply_markup: todosInlineKeyboard,
  });

  const {
    callbackQuery: { data: todoIdCallbackQueryAnswer },
  } = await convo.waitForCallbackQuery([...todos.map((el) => el.id)]);

  const todoActionsKeyboard = new InlineKeyboard()
    .text("complete", `todo:complete_${todoIdCallbackQueryAnswer}`).row()
    .text("edit", `todo:edit_${todoIdCallbackQueryAnswer}`).row()
    .text("delete", `todo:delete_${todoIdCallbackQueryAnswer}`).row()
    .text('exit',"convo:exit")

  await ctx.reply(`choose todo actions`, {
    reply_markup: todoActionsKeyboard
  })

}

export async function editTodoConvo(
  convo: Conversation,
  ctx: Context,
  todoId: string,
) {
  await ctx.reply("Edit Todo!");

  const { message, msgId: messageId, chatId } = await convo.waitFor(":text");

  const updatedTodo = await updateOne({id: todoId},{
    content: message?.text
  })

  await Promise.all([
    ctx.api.setMessageReaction(chatId, messageId, [
      { type: "emoji", emoji: "👍" },
    ]),
    ctx.reply(`${updatedTodo.content} - Updated! `, {
      reply_parameters: {
        message_id: messageId,
      },
    }),
  ]);

  await ctx.reply("Choose Action", {
    reply_markup: mainActionsKeyboard,
  });
}
