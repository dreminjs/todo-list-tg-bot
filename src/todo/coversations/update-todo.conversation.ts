import { Conversation } from "@grammyjs/conversations";
import { Context } from "grammy";
import { mainActionsKeyboard } from "../../app/shared/keyboards/main-actions.keyboard";
import { updateOne } from "../todo.service";
import { InlineKeyboard } from "grammy";

export async function editTodoConvo(
  convo: Conversation,
  ctx: Context,
  todoId: string,
) {

  let isUserWantsToEdit = true;
  
  while (isUserWantsToEdit) {

  const editTodoInlineKeyboard = new InlineKeyboard()
    .text("edit title", "todo:edit:title")
    .text("edit description", "todo:edit:description")
    .text("exit", "convo:exit");

  await ctx.reply("choose what you want to edit", {
    reply_markup: editTodoInlineKeyboard,
  });

  const {
    callbackQuery: { data: editTodoChoice },
  } = (await convo.waitForCallbackQuery([
    "todo:edit:title",
    "todo:edit:description",
  ])) as {
    callbackQuery: { data: "todo:edit:title" | "todo:edit:description" };
  };

  if (editTodoChoice === "todo:edit:title") {
    await ctx.reply("write new title!");

    const { message, msgId: messageId, chatId } = await convo.waitFor(":text");

    const updatedTodo = await updateOne(
      { id: todoId },
      {
        content: message?.text,
      },
    );
    const editConfirmationKeyboard = new InlineKeyboard().text("yes","todo:edit:yes").text("no","todo:edit:no")

    await Promise.all([
      ctx.api.setMessageReaction(chatId, messageId, [
        { type: "emoji", emoji: "👍" },
      ]),
      ctx.reply(`${updatedTodo.content} - Updated! `, {
        reply_parameters: {
          message_id: messageId,
        },
      }),
    ])

    await ctx.reply("Do you wanna continue edit?",{
      reply_markup: editConfirmationKeyboard
    })

    const { callbackQuery: { data } } = await convo.waitForCallbackQuery(["todo:edit:yes","todo:edit:no"]) as {
      callbackQuery: {
        data: "todo:edit:yes" | "todo:edit:no"
      }
    }
    
    if(data === "todo:edit:no"){
      isUserWantsToEdit = false
    }
  } else {
    await ctx.reply("write new description!");

    const { message, msgId: messageId, chatId } = await convo.waitFor(":text");

    const updatedTodo = await updateOne(
      { id: todoId },
      {
        description: message?.text,
      },
    );

    const editConfirmationKeyboard = new InlineKeyboard().text("yes","todo:edit:yes").text("no","todo:edit:no")

    await Promise.all([
      ctx.api.setMessageReaction(chatId, messageId, [
        { type: "emoji", emoji: "👍" },
      ]),
      ctx.reply(`${updatedTodo.description} - Updated! `, {
        reply_parameters: {
          message_id: messageId,
        },
      }),
    ])

    await ctx.reply("Do you wanna continue edit?",{
      reply_markup: editConfirmationKeyboard
    })

    const { callbackQuery: { data } } = await convo.waitForCallbackQuery(["todo:edit:yes","todo:edit:no"]) as {
      callbackQuery: {
        data: "todo:edit:yes" | "todo:edit:no"
      }
    }
    
    if(data === "todo:edit:no"){
      isUserWantsToEdit = false
    }
  }
} 
  await ctx.reply("Choose Action", {
    reply_markup: mainActionsKeyboard,
  });
}
