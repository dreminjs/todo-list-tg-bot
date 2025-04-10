import { CallbackQueryContext } from "grammy";
import { CustomGeneralContext } from "../../../app/shared/interfaces";
import { editTodoConvo } from "../../coversations/update-todo.conversation";

export const editCallback = async (ctx: CallbackQueryContext<CustomGeneralContext>) => {
  await ctx.conversation.enter(editTodoConvo.name, ctx.match[1]);
};
