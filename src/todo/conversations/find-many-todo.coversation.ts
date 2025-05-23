import { Conversation } from "@grammyjs/conversations";
import { Context, InlineKeyboard } from "grammy";
import { findMany as findManyLists } from "../../list";
import { findMany } from "../todo.service";
import { handleShowTodosInlineKeyboard } from "../keyboards/todos.inline-keyboard";

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

  handleShowTodosInlineKeyboard({
    convo,
    listId: listIdCallbackQueryAnswer,
    ctx,
  });
}
