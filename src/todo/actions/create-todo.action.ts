import { Conversation } from "@grammyjs/conversations";
import { createOne as createOneTodo } from "../todo.service";
import { Prisma, Todo } from "@prisma/client";
import { Context } from "grammy";
import { promptText } from "../../app/shared/prompts/prompt-text";
import { promptConfirmAction } from "../../app/shared/prompts/prompt-confirm-action";

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
    createOneTodo({
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

  return createdTodo;
};

export async function handleTodoCreationFlow(
  ctx: Context,
  convo: Conversation,
  listId: string,
): Promise<string | null> {
  const title = await promptText(ctx, convo, "write todo");
  if (!title) return null;

  const wantsDescription = await promptConfirmAction({
    ctx,
    convo,
    message: "do you wanna add description?",
    yesData: "todo:description:yes",
    noData: "todo:description:no",
  });

  let todo;
  if (wantsDescription) {
    const description = await promptText(ctx, convo, "write description!");
    if (!description) return null;

    todo = await convo.external(() =>
      createOneTodo({
        content: title,
        description,
        list: { connect: { id: listId } },
      }),
    );
  } else {
    todo = await convo.external(() =>
      createOneTodo({
        content: title,
        list: { connect: { id: listId } },
      }),
    );
  }

  return todo.id;
}
