import { CallbackQueryContext } from "grammy";
import { CustomGeneralContext } from "../../../app/shared/interfaces";
import { createTodoConvo } from "../../conversations/create-todo.conversation";
import { createTodoFromStepConvo } from "../../conversations/create-todo-from-step.conversation";

export const createCallback = async (
  ctx: CallbackQueryContext<CustomGeneralContext>,
) => {
  await ctx.answerCallbackQuery(); 

  return await ctx.conversation.enter(createTodoConvo.name);
};


export const createFromStepCallback =  async (
  ctx: CallbackQueryContext<CustomGeneralContext>,
) => {
  await ctx.answerCallbackQuery(); 

  return await ctx.conversation.enter(createTodoFromStepConvo.name,ctx.match[1]);
};
