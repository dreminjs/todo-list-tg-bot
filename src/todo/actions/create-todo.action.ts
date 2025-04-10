import { Conversation } from "@grammyjs/conversations";
import { createOne } from "../todo.service";
import { Prisma } from "@prisma/client";
import { mainActionsKeyboard } from "../../app/shared/keyboards/main-actions.keyboard";
import { Context } from "grammy";

interface IArgs {
  convo: Conversation;
  createTodoPayload: Prisma.TodoCreateInput;
  chatId: number;
  messageId: number;
  ctx: Context;
}

export const handleCreateTodo = async ({
  convo,
  createTodoPayload,
  chatId,
  messageId,
  ctx,
}: IArgs) => {
  const createdTodo = await convo.external(() =>
    createOne({
      content: createTodoPayload.content,
      ...(createTodoPayload.description
        ? { description: createTodoPayload.description }
        : {}),
      list: {
        connect: {
          id: createTodoPayload.list?.connect?.id,
        },
      },
    }),
  );

  await Promise.all([
    ctx.api.setMessageReaction(chatId, messageId, [
      { type: "emoji", emoji: "👍" },
    ]),
    ctx.reply(`${createdTodo.content.padStart(50)} - Added! `, {
      reply_parameters: {
        message_id: messageId,
      },
    }),
  ]);

  return await ctx.reply("Choose Action", {
    reply_markup: mainActionsKeyboard,
  });
};
