import { Bot } from "grammy";
import { CustomGeneralContext } from "../app/shared/interfaces";
import { steps } from "./step.composer";
import { createConversation } from "@grammyjs/conversations";
import { deleteStepConvo } from "./conversations/delete-step.conversation";
import { createStepConvo } from "./conversations/create-step.conversation";
import { editStepConvo } from "./conversations/edit-step.conversation";

export function registerStepModule(bot: Bot<CustomGeneralContext>) {
    
    bot.use(createConversation(createStepConvo))

    bot.use(createConversation(deleteStepConvo))

    bot.use(createConversation(editStepConvo))

    bot.use(steps)
}