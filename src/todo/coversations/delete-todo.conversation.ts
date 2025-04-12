import { Conversation } from "@grammyjs/conversations";
import { Context, InlineKeyboard } from "grammy";
import { mainActionsKeyboard } from "../../app/shared/keyboards/main-actions.keyboard";
import { deleteOne } from "../todo.service";

export const deleteTodoConvo = async (
  convo: Conversation,
  ctx: Context,
  todoId: string,
) => {
  const confirmDeleteInlineKeyboard = new InlineKeyboard()
    .text("yes", "todo:delete:yes")
    .text("no", "todo:delete:no");

  await ctx.reply("confirm deletion", {
    reply_markup: confirmDeleteInlineKeyboard,
  });

  const {
    callbackQuery: { data },
  } = await convo.waitForCallbackQuery(["todo:delete:yes", "todo:delete:no"]);

  if (data == "todo:delete:no") {
    await ctx.reply("Deletion is rejected");
    return ctx.reply("Choose Action", {
      reply_markup: mainActionsKeyboard,
    });
  }

  await ctx.reply("Todo deleted!");

  return await Promise.all([
    deleteOne({
      id: todoId,
    }),
    ctx.reply("Choose Action", {
      reply_markup: mainActionsKeyboard,
    }),
  ]);
};
