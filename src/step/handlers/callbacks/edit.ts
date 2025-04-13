import { CallbackQueryContext } from "grammy";
import { CustomGeneralContext } from "../../../app/shared/interfaces";
import { editStepConvo } from "../../conversations/edit-step.conversation";

export const editCallback = async (ctx: CallbackQueryContext<CustomGeneralContext>) => {
    return await ctx.conversation.enter(editStepConvo.name,ctx.match[1])
}   