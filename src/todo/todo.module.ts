import { Bot } from "grammy";
import { CustomGeneralContext } from "../app/shared/interfaces";
import { todos } from "./todo.composer";
import { createConversation } from "@grammyjs/conversations";
import { findManyTodoConvo } from "./conversations/find-many-todo.coversation";
import { createTodoConvo } from "./conversations/create-todo.conversation";
import { editTodoConvo } from "./conversations/edit-todo.conversation";
import { deleteTodoConvo } from "./conversations/delete-todo.conversation";
import { createTodoFromStepConvo } from "./conversations/create-todo-from-step.conversation";

export function registerTodoModule(bot: Bot<CustomGeneralContext>) {
  bot.use(createConversation(createTodoConvo));
  bot.use(createConversation(editTodoConvo));
  bot.use(createConversation(deleteTodoConvo))
  bot.use(createConversation(findManyTodoConvo));
  bot.use(createConversation(createTodoFromStepConvo))
  bot.use(todos);
}
