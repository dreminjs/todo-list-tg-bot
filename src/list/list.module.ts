import { createConversation } from "@grammyjs/conversations";
import { createListConvo, editListConvo } from "./list.coversation";
import { Bot } from "grammy";
import { CustomGeneralContext } from "../app/shared/interfaces";
import { lists } from "./list.composer";

export function registerListModule(bot: Bot<CustomGeneralContext>) {
  bot.use(createConversation(createListConvo));
  bot.use(createConversation(editListConvo))
  bot.use(lists);
}
