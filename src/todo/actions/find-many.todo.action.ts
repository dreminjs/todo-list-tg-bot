import { Context, InlineKeyboard } from "grammy";
import { findMany as findManyLists } from "../../list";
import { handleEmptyLists } from "../../list/actions/create-list.action";
import { Conversation } from "@grammyjs/conversations";

export async function selectList(ctx: Context, convo: Conversation) {
    const telegramId = ctx.chat?.id;
    if (!telegramId) return;
  
    const lists = await convo.external(() =>
        findManyLists({ where: { user: { telegramId } } })
    );
  
    if (lists.length === 0) {
      await handleEmptyLists(ctx);
      
    }
  
    const keyboard = new InlineKeyboard();
    lists.forEach((el) => keyboard.text(el.name, el.id).row());
  
    await ctx.reply("choose list", { reply_markup: keyboard });
  
    const {
      callbackQuery: { data: listIdChoice },
    } = await convo.waitForCallbackQuery(lists.map((el) => el.id));
  
    await ctx.answerCallbackQuery();
    

    return listIdChoice;
  }