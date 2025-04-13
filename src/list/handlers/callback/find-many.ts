import { CallbackQueryContext, InlineKeyboard } from "grammy";
import { CustomGeneralContext } from "../../../app/shared/interfaces";
import { handleShowListsInlineKeyboard } from "../../keyboards/lists.inline-keyboard";

export const findManyCallback = async (
  ctx: CallbackQueryContext<CustomGeneralContext>,
) => {
  const telegramId = ctx.chat?.id;

  if (!telegramId) return;

  ctx.reply("choose list", {
    reply_markup: await handleShowListsInlineKeyboard(telegramId),
  });
};
