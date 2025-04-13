import { Conversation } from "@grammyjs/conversations";
import { Context, InlineKeyboard } from "grammy";
import { deleteOne, findOne } from "../step.service";
import { handleShowStepActionsKeyboard } from "../keyboards/step-actions.inline-keyboard";
import { handleShowStepsInlineKeyboard } from "../keyboards/steps.inline-keyboard";

export const deleteStepConvo = async (
  convo: Conversation,
  ctx: Context,
  stepId: string,
) => {
  const confirmDeleteInlineKeyboard = new InlineKeyboard()
    .text("yes", "step:delete:yes")
    .text("no", "step:delete:no");

  await ctx.reply("confirm deletion", {
    reply_markup: confirmDeleteInlineKeyboard,
  });

  const {
    callbackQuery: { data },
  } = await convo.waitForCallbackQuery(["step:delete:yes", "step:delete:no"]);
  const currentStep = await convo.external(() => findOne({ id: stepId }));

  if(!currentStep?.todoId) return;

  if (data == "step:delete:no") {
    await ctx.reply("Deletion is rejected");
    return ctx.reply("Choose Action", {
      reply_markup: handleShowStepActionsKeyboard({
        stepId,
        isComplete: Boolean(currentStep?.complete),
        todoId: currentStep?.todoId
      }),
    });
  }

  const step = await convo.external(() =>
    deleteOne({
      id: stepId,
    }),
  );

  await ctx.reply("Step deleted!");

  return ctx.reply("choose step",{
    reply_markup: await handleShowStepsInlineKeyboard(step.todoId)
  })
  
};
