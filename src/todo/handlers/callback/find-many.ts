import { CallbackQueryContext, InlineKeyboard } from "grammy";
import { CustomGeneralContext } from "../../../app/shared/interfaces";
import { findManyTodoConvo } from "../../coversations/find-many-todo.coversation";
import { findMany } from "../../todo.service";


export const findManyCallback = async (ctx: CallbackQueryContext<CustomGeneralContext>) => {
    await ctx.conversation.enter(findManyTodoConvo.name);
 }
export const findManyByListIdCallback = async (ctx: CallbackQueryContext<CustomGeneralContext>) => {
  const listId = ctx.match[1];

  const todos = await findMany({
    where: {
      list: {
        id: listId,
      },
    },
  });

  const todosInlineKeyboard = new InlineKeyboard();

  todos.forEach((todo) =>
    todosInlineKeyboard
      .text(todo.content.padStart(50), `todo:choose_${todo.id}`)
      .row(),
  );      

  todosInlineKeyboard.text("exit","convo:exit")
  
}