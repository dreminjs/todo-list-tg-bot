import { Composer } from "grammy";
import { CustomGeneralContext } from "../shared/interfaces";
import { createListConvo } from "./conversations/list";

export const lists = new Composer<CustomGeneralContext>();

lists.callbackQuery("list:create", async (ctx) => {
  await ctx.conversation.enter(createListConvo.name);
});


lists.callbackQuery("list:find-many",async (ctx) => {
  await ctx.reply("lists")
})