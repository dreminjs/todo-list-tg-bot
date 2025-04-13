import { InlineKeyboard } from "grammy";
import { findMany } from "../step.service";

export const handleShowStepsInlineKeyboard = async (
  todoId: string,
) => {
  const steps = await findMany({ todoId });

  if (steps.length === 0) {
    const actionsInlineKeyboard = new InlineKeyboard()
      .text(`add step!`, `step:create_${todoId}`)
      .row()
      .text("return", `todo:choose_${todoId}`);

    return actionsInlineKeyboard;
  }

  const inlineKeyboard = new InlineKeyboard();

  steps.forEach((step) =>
    inlineKeyboard.text(step.content, `step:choose_${step.id}`).row(),
  );

  inlineKeyboard.text("return", `todo:choose_${todoId}`);

  return inlineKeyboard;
};
