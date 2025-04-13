import { CallbackQueryContext, InlineKeyboard } from "grammy";
import { CustomGeneralContext } from "../../../app/shared/interfaces";
import { findOne } from "../../step.service";
import { handleShowStepActionsKeyboard } from "../../keyboards/step-actions.inline-keyboard";

export const chooseCallback = async (
  ctx: CallbackQueryContext<CustomGeneralContext>,
) => {
  const stepId = ctx.match[1];

  const currentStep = await findOne({ id: stepId });

  if (!currentStep) return ctx.reply("todo id is null!");

  return await ctx.reply("choose action for step", {
    reply_markup: handleShowStepActionsKeyboard({
      stepId,
      isComplete: Boolean(currentStep?.complete),
      todoId: currentStep.todoId,
    }),
  });
};
