import { Conversation } from "@grammyjs/conversations";
import { Context } from "grammy";
import { mainActionsKeyboard } from "../../shared/keyboards/main-actions.keyboard";


export async function createTodoConvo(convo: Conversation, ctx: Context) {
  await ctx.reply(`Write Todo!`);

  const { message, msgId: messageId, chatId } = await convo.waitFor(":text");

  if (message?.text) {
    // array.push({ title: message.text, id: v4(), complete: false });
  } else {
    ctx.reply("Write someting");
  }

  await ctx.reply("Added!", {
    reply_parameters: {
      message_id: messageId,
    },
  }),
    await Promise.all([
      ctx.api.setMessageReaction(chatId, messageId, [
        { type: "emoji", emoji: "👍" },
      ]),

      ctx.reply("Choose Action", {
        reply_markup: mainActionsKeyboard,
      }),
    ]);
}

export async function editTodoConvo(
  convo: Conversation,
  ctx: Context,
  todoId: string,
) {
  await ctx.reply("Edit Todo!");

  const { message, msgId: messageId, chatId } = await convo.waitFor(":text");

  /// const index = array.findIndex((el) => el.id === todoId);

  if (message?.text) {
   // array[index].title = message?.text;
  } else {
    ctx.reply("Something go wrong!");
  }

 // await ctx.reply(`${array[index].title} - new title`);

  await ctx.reply("Choose Action", {
    reply_markup: mainActionsKeyboard,
  });
}