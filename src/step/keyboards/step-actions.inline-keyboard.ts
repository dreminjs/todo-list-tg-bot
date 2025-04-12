import { InlineKeyboard } from "grammy";

export const handleShowStepActionsKeyboard = ({
  isComplete,
  stepId,
}: {
  stepId: string;
  isComplete: boolean;
}) => {

  const isCompleteLabel = isComplete ? "uncomplete": "complete"

  return new InlineKeyboard()
    .text("edit", `step:edit_${stepId}`).row()
    .text(isCompleteLabel, `step:toggle-complete_${stepId}`).row()
    .text('delete',`step:delete_${stepId}`).row()
    .text("make task",`step:todo:create_${stepId}`).row()
    .text("exit","convo:exit")
};
