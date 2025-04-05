import { createConversation } from "@grammyjs/conversations";
import { createListConvo } from "./conversations/list";
import { Bot } from "grammy";
import { CustomGeneralContext } from "../shared/interfaces";
import { lists } from "./list";

export function registerListModule(bot: Bot<CustomGeneralContext>) {
  bot.use(createConversation(createListConvo));
  bot.use(lists);
}
