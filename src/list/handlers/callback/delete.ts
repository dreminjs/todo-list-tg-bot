import { CallbackQueryContext } from "grammy";
import { CustomGeneralContext } from "../../../app/shared/interfaces";
import { mainActionsKeyboard } from "../../../app/shared/keyboards/main-actions.keyboard";
import { deleteOne } from "../../list.service";

export const deleteCallback = async (ctx: CallbackQueryContext<CustomGeneralContext>) => {
  const listId = ctx.match[1];

  const deleteTodo = await deleteOne({
    where: {
      id: listId,
    },
  });

  return ctx.reply(`${deleteTodo.name} - deleted!`, {
    reply_markup: mainActionsKeyboard,
  });
};
