import { CallbackQueryContext } from "grammy";
import { mainActionsKeyboard } from "../../../app/shared/keyboards/main-actions.keyboard";
import { findOne, updateOne } from "../../todo.service";
import { CustomGeneralContext } from "../../../app/shared/interfaces";

export const toggleCompleteCallback = async (
  ctx: CallbackQueryContext<CustomGeneralContext>,
) => {
  const todoId = ctx.match[1];

  const currentTodo = await findOne({where:{id: todoId}})

  const completedTodo = await updateOne(
    {
      id: todoId,
    },
    {
      complete: {
        set: !currentTodo?.complete
      },
    },
  );

  await ctx.reply(`${completedTodo.content} - completed! \nChoose Action!`, {
    reply_markup: mainActionsKeyboard,
  });
};
