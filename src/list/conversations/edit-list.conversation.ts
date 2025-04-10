import { Conversation } from "@grammyjs/conversations";
import { Context } from "vm";
import { mainActionsKeyboard } from "../../app/shared/keyboards/main-actions.keyboard";
import { updateOne } from "../list.service";

export const editListConvo =  async (convo: Conversation, ctx: Context,listId: string) => { 
    await ctx.reply("Edit List name!");
  
    const { message } = await convo.waitFor(":text");
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