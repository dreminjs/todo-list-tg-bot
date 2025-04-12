import { CallbackQueryContext, InlineKeyboard } from "grammy";
import { findMany } from "../../list.service";
import { CustomGeneralContext } from "../../../app/shared/interfaces";

export const findManyCallback = async (
  ctx: CallbackQueryContext<CustomGeneralContext>,
) => {
  const listsInlineKeyboard = new InlineKeyboard();

  const telegramId = ctx.chat?.id;

  if (!ctx.chat?.id) return;

  const lists = await findMany({
    where: {
      user: {
        telegramId,
      },
    },
  });
  lists.forEach((list) => {
    listsInlineKeyboard.text(list.name, `list:choose_${list.id}`).row();
  });

  listsInlineKeyboard.text("return", "convo:exit");

  ctx.reply("choose list", {
    reply_markup: listsInlineKeyboard,
  });
};
