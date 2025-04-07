import { Composer, InlineKeyboard } from "grammy";
import { CustomGeneralContext } from "../app/shared/interfaces";
import { mainActionsKeyboard } from "../app/shared/keyboards/main-actions.keyboard";
import {
  editTodoConvo,
  createTodoConvo,
  findManyTodoConvo,
} from "./todo.coversation";
import { deleteOne, findMany, findOne, updateOne } from "./todo.service";
export const todos = new Composer<CustomGeneralContext>();

todos.callbackQuery(/^todo:complete_([\w-]+)$/, async (ctx) => {
  const todoId = ctx.match[1];

  const completedTodo = await updateOne({
    id: todoId
  },{
    complete: true
  })

  await ctx.reply(`${completedTodo.content} - completed! \n Choose Action!`, {
    reply_markup: mainActionsKeyboard,
  });
});

todos.callbackQuery(/^todo:edit_([\w-]+)$/, async (ctx) => {
  await ctx.conversation.enter(editTodoConvo.name, ctx.match[1]);
});

todos.callbackQuery(/^todo:delete_([\w-]+)$/, async (ctx) => {
  const todoId = ctx.match[1];

  Promise.all([
    deleteOne({
      id: todoId,
    }),

    ctx.reply("Choose Action", {
      reply_markup: mainActionsKeyboard,
    }),
  ]);
});

todos.callbackQuery("todo:find-many", async (ctx) => {
   await ctx.conversation.enter(findManyTodoConvo.name);
});

todos.callbackQuery(/^todo:find-many-by_([\w]+)$/, async (ctx) => {
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
});

todos.callbackQuery(/^todo:choose_([\w-]+)$/, async (ctx) => {
  const todoId = ctx.match[1];

  const choosedTodo = await findOne({
    where: {
      id: todoId,
    },
  });

  const actionsKeyboard = new InlineKeyboard()
    .text("edit", `todo:edit_${todoId}`)
    .row()
    .text("delete", `todo:delete_${todoId}`)
    .row()
    .text("complete", `todo:complete_${todoId}`)
    .row().text("exit","convo:exit")

    return await ctx.reply(`Вы выбрали: ${choosedTodo?.content}`, {
      reply_markup: actionsKeyboard,
    });
});

todos.callbackQuery("todo:create", async (ctx) => {
  return await ctx.conversation.enter(createTodoConvo.name);
});

