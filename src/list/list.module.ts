import { createConversation } from "@grammyjs/conversations";
import { createListConvo } from "./list.coversation";
import { Bot } from "grammy";
import { CustomGeneralContext } from "../shared/interfaces";
import { lists } from "./list.composer";

export function registerListModule(bot: Bot<CustomGeneralContext>) {
  bot.use(createConversation(createListConvo));
  bot.use(lists);
}
