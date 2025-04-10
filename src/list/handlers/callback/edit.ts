import { CallbackQueryContext } from "grammy";
import { CustomGeneralContext } from "../../../app/shared/interfaces";
import { editListConvo } from "../../conversations/edit-list.conversation";



export const editCallback = async (ctx: CallbackQueryContext<CustomGeneralContext>) => {
    await ctx.conversation.enter(editListConvo.name, ctx.match[1]);
  }