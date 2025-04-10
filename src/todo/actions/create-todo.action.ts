import { Conversation } from "@grammyjs/conversations";
import { createOne } from "../todo.service";
import { Prisma, Todo } from "@prisma/client";
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
}: IArgs): Promise<Todo> => {
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

  return createdTodo
};
