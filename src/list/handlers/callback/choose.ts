import { CallbackQueryContext, InlineKeyboard } from "grammy";
import { CustomGeneralContext } from "../../../app/shared/interfaces";

export const chooseCallback = async (
  ctx: CallbackQueryContext<CustomGeneralContext>,
) => {
  const listId = ctx.match[1];

  const listActionsInlineKeyboard = new InlineKeyboard()
    .text("edit", `list:edit_${listId}`)
    .text("see all todos", `todo:find-many_${listId}`)
    .text("delete", `list:delete_${listId}`)
    .row()
    .text("exit", "convo:exit");

  await ctx.reply("choose actions", {
    reply_markup: listActionsInlineKeyboard,
  });
};
