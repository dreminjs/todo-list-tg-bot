import { Context, InlineKeyboard } from "grammy";

export const handleEmptyLists = (ctx: Context) => {
  const actionsInlineKeyboard = new InlineKeyboard();

  actionsInlineKeyboard
    .text("add list", "list:create")
    .text("exit", "convo:exit");

  return ctx.reply("You dont have any lists", {
    reply_markup: actionsInlineKeyboard,
  });
};
