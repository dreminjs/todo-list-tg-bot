import { CallbackQueryContext, InlineKeyboard } from "grammy";
import { CustomGeneralContext } from "../../../app/shared/interfaces";
import { hanldeShowListActionsInlineKeyboard } from "../../keyboards/list-actions.inline-keyboard";

export const chooseCallback = async (
  ctx: CallbackQueryContext<CustomGeneralContext>,
) => {
return await ctx.reply("choose actions", {
    reply_markup: hanldeShowListActionsInlineKeyboard(ctx.match[1]),
  });
};
