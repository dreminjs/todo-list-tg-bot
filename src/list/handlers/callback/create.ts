import { CallbackQueryContext } from "grammy";
import { createListConvo } from "../../conversations/create-list.conversation";
import { CustomGeneralContext } from "../../../app/shared/interfaces";

export const createCallback = async (
  ctx: CallbackQueryContext<CustomGeneralContext>,
) => {
  return await ctx.conversation.enter(createListConvo.name);
};
