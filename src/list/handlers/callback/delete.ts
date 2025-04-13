import { CallbackQueryContext } from "grammy";
import { CustomGeneralContext } from "../../../app/shared/interfaces";
import { deleteOne } from "../../list.service";
import { handleShowListsInlineKeyboard } from "../../keyboards/lists.inline-keyboard";

export const deleteCallback = async (ctx: CallbackQueryContext<CustomGeneralContext>) => {
  const listId = ctx.match[1];

  const telegramId = ctx.chat?.id

  if(!telegramId) return;

  const deleteTodo = await deleteOne({
    where: {
      id: listId,
    },
  });

// todo: MAKE CONVO

  return ctx.reply(`${deleteTodo.name} - deleted!`, {
    reply_markup:await handleShowListsInlineKeyboard(telegramId),
  });
};
