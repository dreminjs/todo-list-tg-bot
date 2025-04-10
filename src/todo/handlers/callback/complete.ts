import { CallbackQueryContext } from "grammy";
import { mainActionsKeyboard } from "../../../app/shared/keyboards/main-actions.keyboard";
import { updateOne } from "../../todo.service";
import { CustomGeneralContext } from "../../../app/shared/interfaces";

export const completeCallback = async (
  ctx: CallbackQueryContext<CustomGeneralContext>,
) => {
  const todoId = ctx.match[1];

  const completedTodo = await updateOne(
    {
      id: todoId,
    },
    {
      complete: true,
    },
  );

  await ctx.reply(`${completedTodo.content} - completed! \n Choose Action!`, {
    reply_markup: mainActionsKeyboard,
  });
};
