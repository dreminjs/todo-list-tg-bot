import { Conversation } from "@grammyjs/conversations";
import { Context, InlineKeyboard } from "grammy";
import { mainActionsKeyboard } from "../../app/shared/keyboards/main-actions.keyboard";
import { deleteOne } from "../step.service";

export const deleteStepConvo = async (
  convo: Conversation,
  ctx: Context,
  stepId: string,
) => {
  const confirmDeleteInlineKeyboard = new InlineKeyboard()
    .text("yes", "step:delete:yes")
    .text("no", "step:delete:no");

  await ctx.reply("confirm deletion",{
    reply_markup: confirmDeleteInlineKeyboard
  })   

  const {
    callbackQuery: { data },
  } = await convo.waitForCallbackQuery(["step:delete:yes", "step:delete:no"]);

  if (data == "step:delete:no") {
    await ctx.reply("Deletion is rejected");
    return ctx.reply("Choose Action", {
      reply_markup: mainActionsKeyboard,
    });
  }

  await ctx.reply("Step deleted!");

  return await Promise.all([
    deleteOne({
      id: stepId,
    }),
    ctx.reply("Choose Action", {
      reply_markup: mainActionsKeyboard,
    }),
  ]);
};
