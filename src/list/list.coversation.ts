import { Conversation } from "@grammyjs/conversations";
import { Context } from "grammy";
import { createOne } from "./list.service";
import { mainActionsKeyboard } from "../shared/keyboards/main-actions.keyboard";

export const createListConvo = async (convo: Conversation, ctx: Context) => {
  await ctx.reply("Write List name!");

  const { message, msgId: messageId, chatId } = await convo.waitFor(":text");

  if (message?.text) {
    await createOne({
      name: message?.text,
      user: {
        connect: {
          telegramId: ctx.chat?.id,
        }, 
      },
    });
  }

  return await ctx.reply(`added ${message!.text} list`,{
    reply_markup: mainActionsKeyboard
  })

};
