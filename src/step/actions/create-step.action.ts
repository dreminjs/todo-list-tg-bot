import { Conversation } from "@grammyjs/conversations";
import { Context, InlineKeyboard } from "grammy";

export const handleCreateStep = async (ctx: Context, convo: Conversation) => {
  const stepInlineKeyboard = new InlineKeyboard()
    .text("yes", "step:yes")
    .text("no", "step:no");

  await ctx.reply("do wanna add steps", {
    reply_markup: stepInlineKeyboard,
  });

  const {
    callbackQuery: { data: stepChoice },
  } = await convo.waitForCallbackQuery(["step:yes", "step:no"]);

  
};
