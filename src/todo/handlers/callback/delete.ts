import { CallbackQueryContext } from "grammy";
import { mainActionsKeyboard } from "../../../app/shared/keyboards/main-actions.keyboard";
import { deleteOne } from "../../todo.service";
import { CustomGeneralContext } from "../../../app/shared/interfaces";

export const deleteCallback = async (
  ctx: CallbackQueryContext<CustomGeneralContext>,
) => {
  const todoId = ctx.match[1];

  Promise.all([
    deleteOne({
      id: todoId,
    }),

    ctx.reply("Choose Action", {
      reply_markup: mainActionsKeyboard,
    }),
  ]);
};