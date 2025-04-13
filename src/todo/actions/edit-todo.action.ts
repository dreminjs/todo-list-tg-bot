import { Context, InlineKeyboard } from "grammy";
import { updateOne } from "../todo.service";
import { Conversation } from "@grammyjs/conversations";

const askContinueEditing = async (ctx: Context, convo: Conversation,todoId: string) => {
  const editConfirmationKeyboard = new InlineKeyboard()
    .text("yes", "todo:edit:yes")
    .text("no", `todo:edit:no`);

  await ctx.reply("Do you wanna continue editing?", {
    reply_markup: editConfirmationKeyboard,
  });

  const {
    callbackQuery: { data },
  } = await convo.waitForCallbackQuery(["todo:edit:yes", "todo:edit:no"]);

  return data === "todo:edit:yes";
};

export const handleEditField = async (
  field: "title" | "description",
  label: string,
  ctx: Context,
  convo: Conversation,
  todoId: string,
) => {
  await ctx.reply(`Write new ${label}!`);
  const { message, msgId, chatId } = await convo.waitFor(":text");

  const payload =
    field === "title"
      ? { content: message?.text }
      : { description: message?.text };

  const updatedTodo = await updateOne({ id: todoId }, payload);

  const updatedValue =
    field === "title" ? updatedTodo.content : updatedTodo.description;

  await Promise.all([
    ctx.api.setMessageReaction(chatId, msgId, [{ type: "emoji", emoji: "👍" }]),
    ctx.reply(`${updatedValue} - Updated!`, {
      reply_parameters: {
        message_id: msgId,
      },
    }),
  ]);

  return await askContinueEditing(ctx,convo,todoId);
};
