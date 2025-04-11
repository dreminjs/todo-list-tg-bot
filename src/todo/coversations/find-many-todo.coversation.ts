import { Conversation } from "@grammyjs/conversations";
import { Context, InlineKeyboard } from "grammy";
import { findMany as findManyLists } from "../../list";
import { findMany } from "../todo.service";

export async function findManyTodoConvo(convo: Conversation, ctx: Context) {
  const telegramId = ctx.chat?.id;

  if (!telegramId) return;

  const lists = await convo.external(() =>
    findManyLists({
      where: {
        user: {
          telegramId,
        },
      },
    }),
  );

  const listsInlineKeyboard = new InlineKeyboard();

  lists.forEach((list) => listsInlineKeyboard.text(list.name, list.id).row());

  if (lists.length === 0) {
    // return await handleEmptyLists(ctx)

    const actionsInlineKeyboard = new InlineKeyboard();

    actionsInlineKeyboard
      .text("add list", "list:create")
      .text("exit", "convo:exit");
  
    return await ctx.reply("You dont have any lists", {
      reply_markup: actionsInlineKeyboard,
    });
   }

  await ctx.reply("choose list", {
    reply_markup: listsInlineKeyboard.text("exit", "convo:exit"),
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
    reply_markup: todosInlineKeyboard.text("exit", "convo:exit"),
  });

  const {
    callbackQuery: { data: todoIdCallbackQueryAnswer },
  } = await convo.waitForCallbackQuery([...todos.map((el) => el.id)]);

  const todoActionsKeyboard = new InlineKeyboard()
    .text("complete", `todo:complete_${todoIdCallbackQueryAnswer}`)
    .row()
    .text("edit", `todo:edit_${todoIdCallbackQueryAnswer}`)
    .row()
    .text("delete", `todo:delete_${todoIdCallbackQueryAnswer}`)
    .row()
    .text("exit", "convo:exit");

  await ctx.reply(`choose todo actions`, {
    reply_markup: todoActionsKeyboard,
  });
}
