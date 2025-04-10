import { CallbackQueryContext } from "grammy";
import { CustomGeneralContext } from "../../../app/shared/interfaces";
import { createTodoConvo } from "../../coversations/create-todo.conversation";

export const createCallback = async (
  ctx: CallbackQueryContext<CustomGeneralContext>,
) => {
  await ctx.answerCallbackQuery(); 

  return await ctx.conversation.enter(createTodoConvo.name);
};
