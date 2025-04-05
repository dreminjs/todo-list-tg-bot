import { Bot, Composer } from "grammy";
import { CustomGeneralContext } from "../shared/interfaces";
import { createConversation } from "@grammyjs/conversations";
import { createTodoConvo, editTodoConvo } from "./conversations/todo";
import { todos } from "./todo.composer";

export function registerTodoModule(bot: Bot<CustomGeneralContext>) {
  bot.use(createConversation(createTodoConvo));
  bot.use(createConversation(editTodoConvo));
  bot.use(todos);
}
