import { CallbackQueryContext } from "grammy";
import { CustomGeneralContext } from "../../../app/shared/interfaces";
import { deleteTodoConvo } from "../../conversations/delete-todo.conversation";
export const deleteCallback = async (
  ctx: CallbackQueryContext<CustomGeneralContext>,
) => {
  return await ctx.conversation.enter(deleteTodoConvo.name, ctx.match[1])
};
