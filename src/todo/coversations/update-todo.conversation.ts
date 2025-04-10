import { Conversation } from "@grammyjs/conversations";
import { Context } from "vm";
import { mainActionsKeyboard } from "../../app/shared/keyboards/main-actions.keyboard";
import { updateOne } from "../todo.service";

export async function editTodoConvo(
  convo: Conversation,
  ctx: Context,
  todoId: string,
) {
  await ctx.reply("Edit Todo!");

  const { message, msgId: messageId, chatId } = await convo.waitFor(":text");

  const updatedTodo = await updateOne(
    { id: todoId },
    {
      content: message?.text,
    },
  );

  await Promise.all([
    ctx.api.setMessageReaction(chatId, messageId, [
      { type: "emoji", emoji: "👍" },
    ]),
    ctx.reply(`${updatedTodo.content} - Updated! `, {
      reply_parameters: {
        message_id: messageId,
      },
    }),
  ]);

  await ctx.reply("Choose Action", {
    reply_markup: mainActionsKeyboard,
  });
}
