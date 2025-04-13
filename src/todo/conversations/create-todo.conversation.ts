import { Context } from "grammy";
import { Conversation } from "@grammyjs/conversations";
import { selectList } from "../actions/find-many.todo.action";
import { handleStepsFlow } from "../../step/actions/create-step.action";
import { handleTodoCreationFlow } from "../actions/create-todo.action";

export async function createTodoConvo(convo: Conversation, ctx: Context) {
  const listId = await selectList(ctx, convo);
  if (!listId) return;

  const todoId = await handleTodoCreationFlow(ctx, convo, listId);
  if (!todoId) return;

  await handleStepsFlow(ctx, convo, todoId);
}