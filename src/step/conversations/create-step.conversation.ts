import { Conversation } from "@grammyjs/conversations";
import { Context } from "grammy";
import { createOne } from "../step.service";
import { handleShowStepActionsKeyboard } from "../keyboards/step-actions.inline-keyboard";
import { handleCreateSteps } from "../actions/create-step.action";

export const createStepConvo = async (
  convo: Conversation,
  ctx: Context,
  todoId: string,
) => {
  let isUserWantsToAddSteps = false;
  await ctx.reply("write step!");

  const { message } = await convo.waitFor(":text");

  if (!message?.text) return;

  const step = await convo.external(() =>
    createOne({ content: message.text, todo: { connect: { id: todoId } } }),
  );

  await ctx.reply(`${step.content} - created!`);

  handleCreateSteps({
    complete: step.complete,
    convo,
    ctx,
    isUserWantsContinue: isUserWantsToAddSteps,
    todoId,
  });

  return await ctx.reply("choose action", {
    reply_markup: handleShowStepActionsKeyboard({
      stepId: step.todoId,
      isComplete: step.complete,
    }),
  });
};
