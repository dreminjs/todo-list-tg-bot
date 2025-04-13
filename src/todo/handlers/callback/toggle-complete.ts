import { CallbackQueryContext } from "grammy";
import { mainActionsKeyboard } from "../../../app/shared/keyboards/main-actions.keyboard";
import { findOne, updateOne } from "../../todo.service";
import { CustomGeneralContext } from "../../../app/shared/interfaces";
import { handleShowtodoActionsInline } from "../../keyboards/todo-actions.inline-keyboard";

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

  if(!completedTodo.listId) return;

  return await handleShowtodoActionsInline({ ctx, todo: completedTodo });
};
