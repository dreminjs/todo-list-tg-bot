import { Bot } from "grammy";
import { CustomGeneralContext } from "../app/shared/interfaces";
import { createConversation } from "@grammyjs/conversations";
import { findManyTodoConvo } from "./coversations/find-many-todo.coversation";
import { todos } from "./todo.composer";
import { createTodoConvo } from "./coversations/create-todo.conversation";
import { editTodoConvo } from "./coversations/update-todo.conversation";
import { deleteTodoConvo } from "./coversations/delete-todo.conversation";

export function registerTodoModule(bot: Bot<CustomGeneralContext>) {
  bot.use(createConversation(createTodoConvo));
  bot.use(createConversation(editTodoConvo));
  bot.use(createConversation(deleteTodoConvo))
  bot.use(createConversation(findManyTodoConvo));
  bot.use(todos);
}
