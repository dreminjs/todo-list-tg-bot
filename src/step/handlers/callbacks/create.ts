import { CallbackQueryContext } from "grammy";
import { CustomGeneralContext } from "../../../app/shared/interfaces";
import { createStepConvo } from "../../conversations/create-step.conversation";

export const createOneCallback = async (
  ctx: CallbackQueryContext<CustomGeneralContext>,
) => {
  return await ctx.conversation.enter(createStepConvo.name, ctx.match[1]);
};

export const createManyCallback = (
  ctx: CallbackQueryContext<CustomGeneralContext>,
) => {
  const todoId = ctx.match[1];
};
