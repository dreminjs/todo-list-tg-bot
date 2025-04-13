import { Conversation } from "@grammyjs/conversations";
import { Context, InlineKeyboard } from "grammy";
import { findMany } from "../todo.service";

export const handleShowTodosInlineKeyboard = async ({
  convo,
  listId,
  ctx,
}: {
  convo: Conversation;
  listId: string;
  ctx: Context;
}) => {
  const inlineKeyboard = new InlineKeyboard();

  const todos = await convo.external(() =>
    findMany({
      where: {
        list: {
          id: listId,
        },
      },
    }),
  );

  todos.forEach((todo) =>
    inlineKeyboard.text(todo.content, `todo:choose_${todo.id}`).row(),
  );

  await ctx.reply("choose todo for action", {
    reply_markup: inlineKeyboard.text("return", "list:find-many"),
  });
};
