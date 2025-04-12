import { CallbackQueryContext, InlineKeyboard } from "grammy";
import { CustomGeneralContext } from "../../../app/shared/interfaces";
import { findOne } from "../../step.service";

export const chooseCallback = async (
  ctx: CallbackQueryContext<CustomGeneralContext>,
) => {
  const stepId = ctx.match[1];

  const currentStep = await findOne({ id: stepId });

  const isCompleteLabel = currentStep?.complete ? "uncomplete" : "complete";

  const actionsInlineKeyboard = new InlineKeyboard()
    .text("edit", `step:edit_${stepId}`).row()
    .text(isCompleteLabel, `step:toggle-complete_${stepId}`).row()
    .text('delete',`step:delete_${stepId}`).row()
    .text("make task",`step:todo:create_${stepId}`).row()
    .text("exit","convo:exit")

 return await ctx.reply("choose action for step",{
    reply_markup: actionsInlineKeyboard
 })
};
