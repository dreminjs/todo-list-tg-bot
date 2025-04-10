import { Conversation } from "@grammyjs/conversations";
import { Context } from "vm";
import { mainActionsKeyboard } from "../../app/shared/keyboards/main-actions.keyboard";
import { createOne } from "../list.service";

export const createListConvo = async (convo: Conversation, ctx: Context) => {
    await ctx.reply("Write List name!");
  
    const { message } = await convo.waitFor(":text");
  
    if (!message?.text) return;
  
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

