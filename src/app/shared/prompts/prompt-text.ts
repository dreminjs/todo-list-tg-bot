import { Conversation } from "@grammyjs/conversations";
import { Context } from "grammy";

export async function promptText(ctx: Context, convo: Conversation, message: string) {
    await ctx.reply(message);
    const { message: msg } = await convo.waitFor(":text");
    return msg?.text ?? null;
  }