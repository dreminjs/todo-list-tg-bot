import { createConversation } from "@grammyjs/conversations";
import { Bot } from "grammy";
import { CustomGeneralContext } from "../app/shared/interfaces";
import { lists } from "./list.composer";
import { createListConvo } from "./conversations/create-list.conversation";
import { editListConvo } from "./conversations/edit-list.conversation";

export function registerListModule(bot: Bot<CustomGeneralContext>) {
  bot.use(createConversation(createListConvo));
  bot.use(createConversation(editListConvo))
  bot.use(lists);
}
