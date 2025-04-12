import { Conversation } from "@grammyjs/conversations";
import { Context, InlineKeyboard } from "grammy";
import { deleteOne, findOne } from "../step.service";
import { handleShowStepActionsKeyboard } from "../keyboards/step-actions.inline-keyboard";

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
  const [
    {
      callbackQuery: { data },
    },
    currentStep,
  ] = await convo.external(() =>
    Promise.all([
      convo.waitForCallbackQuery(["step:delete:yes", "step:delete:no"]),
      findOne({ id: stepId }),
    ]),
  );

  if (data == "step:delete:no") {
    await ctx.reply("Deletion is rejected");
    return ctx.reply("Choose Action", {
      reply_markup: handleShowStepActionsKeyboard({
        stepId,
        isComplete: Boolean(currentStep?.complete),
      }),
    });
  }

  await ctx.reply("Step deleted!");

  return await Promise.all([
    deleteOne({
      id: stepId,
    }),
    ctx.reply("Choose Action", {
      reply_markup: handleShowStepActionsKeyboard({
        stepId,
        isComplete: Boolean(currentStep?.complete),
      }),
    }),
  ]);
};
