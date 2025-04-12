import { CallbackQueryContext } from "grammy";
import { CustomGeneralContext } from "../../../app/shared/interfaces";
import { deleteStepConvo } from "../../conversations/delete-step.conversation";

export const deleteOneCallback = async (
  ctx: CallbackQueryContext<CustomGeneralContext>,
) => {
  return await ctx.conversation.enter(deleteStepConvo.name, ctx.match[1]);
};
