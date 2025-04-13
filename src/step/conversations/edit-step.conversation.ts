import { Conversation } from "@grammyjs/conversations";
import { Context } from "vm";
import { updateOne } from "../step.service";
import { handleShowStepActionsKeyboard } from "../keyboards/step-actions.inline-keyboard";

export const editStepConvo = async (
  convo: Conversation,
  ctx: Context,
  stepId: string,
) => {
  await ctx.reply("write new step name!");

  const { message } = await convo.waitFor(":text");

  if (!message?.text) return await ctx.reply;

  const updatedStep = await updateOne(
    {
      id: stepId,
    },
    {
      content: message.text,
    },
  );

  if (!message?.text) return;

  ctx.reply(`updated ${message!.text} step`, {
    reply_markup: handleShowStepActionsKeyboard({
      stepId,
      isComplete: updatedStep.complete,
      todoId: updatedStep.todoId
    }),
  });
};
