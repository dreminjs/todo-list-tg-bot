import { Conversation } from "@grammyjs/conversations";
import { Context, InlineKeyboard } from "grammy";

export async function promptConfirmAction({
  yesData,
  noData,
  convo,
  ctx,
  message,
}: {
  ctx: Context;
  convo: Conversation;
  message: string;
  yesData: string;
  noData: string;
}) {
  const keyboard = new InlineKeyboard().text("yes", yesData).text("no", noData);

  await ctx.reply(message, { reply_markup: keyboard });

  const {
    callbackQuery: { data: choice },
  } = await convo.waitForCallbackQuery([yesData, noData]);

  await ctx.answerCallbackQuery();
  return choice === yesData;
}
