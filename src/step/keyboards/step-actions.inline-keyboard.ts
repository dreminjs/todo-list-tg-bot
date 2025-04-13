import { InlineKeyboard } from "grammy";

export const handleShowStepActionsKeyboard = ({
  isComplete,
  stepId,
  todoId
}: {
  stepId: string;
  isComplete: boolean;
  todoId: string
}): InlineKeyboard => {

  const isCompleteLabel = isComplete ? "uncomplete": "complete"

  return new InlineKeyboard()
    .text("edit", `step:edit_${stepId}`).row()
    .text(isCompleteLabel, `step:toggle-complete_${stepId}`).row()
    .text('delete',`step:delete_${stepId}`).row()
    .text("make task",`todo:create-by-step_${stepId}`).row()
    .text("return",`todo:choose_${todoId}`)
};
