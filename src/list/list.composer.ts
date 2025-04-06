import { Composer, InlineKeyboard } from "grammy";
import { CustomGeneralContext } from "../shared/interfaces";
import { createListConvo } from "./list.coversation";
import { findMany } from "./list.service";

export const lists = new Composer<CustomGeneralContext>();

lists.callbackQuery("list:create", async (ctx) => {
  return await ctx.conversation.enter(createListConvo.name);
});

lists.callbackQuery("list:find-many", async (ctx) => {
  const listsInlineKeyboard = new InlineKeyboard();

  if (ctx.chat?.id) {
    const lists = await findMany(ctx.chat?.id);
    lists.forEach((list) => {
      listsInlineKeyboard.text(list.name, `list:choose_${list.id}`).row();
    });
  }

  ctx.reply("Choose list", {
    reply_markup: listsInlineKeyboard,
  });
});

lists.callbackQuery(/^list:choose_([\w-]+)$/, async (ctx) => {
  const listId = ctx.match[1]
  
});
