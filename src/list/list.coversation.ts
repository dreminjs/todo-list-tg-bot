import { Conversation } from "@grammyjs/conversations";
import { Context } from "grammy";
import { createOne, updateOne } from "./list.service";
import { mainActionsKeyboard } from "../app/shared/keyboards/main-actions.keyboard";

export const createListConvo = async (convo: Conversation, ctx: Context) => {
  await ctx.reply("Write List name!");

  const { message, msgId: messageId, chatId } = await convo.waitFor(":text");

  if (!message?.text)  return;

  await Promise.all([
    createOne({
      name: message?.text,
      user: {
        connect: {
          telegramId: ctx.chat?.id,
        }, 
      },
    }),
    ctx.reply(`added ${message!.text} list`,{
      reply_markup: mainActionsKeyboard
    })
  ])

};


export const editListConvo =  async (convo: Conversation, ctx: Context,listId: string) => { 
  await ctx.reply("Edit List name!");

  const { message, msgId: messageId, chatId } = await convo.waitFor(":text");
  if (!message?.text)  return;

  await Promise.all([
    updateOne({
      id:listId
    },{
      name: message.text
    }),
    ctx.reply(`updated ${message!.text} list`,{
      reply_markup: mainActionsKeyboard
    })
  ])
} 