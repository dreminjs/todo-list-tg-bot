import { Composer } from "grammy";
import { CustomGeneralContext } from "../shared/interfaces";
import { mainActionsKeyboard } from "../shared/keyboards/main-actions.keyboard";
import { editTodoConvo, createTodoConvo } from "./conversations/todo";

export const todos = new Composer<CustomGeneralContext>();

todos.callbackQuery(/^todo:complete_([\w-]+)$/, async (ctx) => {
  const todoId = ctx.match[1];

  // const currentTodoIdx = array.findIndex((el) => el.id === todoId);

  // array[currentTodoIdx].complete = true;

 // await ctx.reply(`${array[currentTodoIdx].title} - is complete`);

  await ctx.reply("Choose Action", {
    reply_markup: mainActionsKeyboard,
  });
});

todos.callbackQuery(/^todo:edit_([\w-]+)$/, async (ctx) => {
  await ctx.conversation.enter(editTodoConvo.name, ctx.match[1]);
});

todos.callbackQuery(/^todo:delete_([\w-]+)$/, async (ctx) => {
  const todoId = ctx.match[1];

 // const index = array.findIndex((el) => el.id === todoId);

 // const deletedTodoTitle = array[index].title;

 // array = array.filter((el) => el.id !== todoId);

 // await ctx.reply(`${deletedTodoTitle} - deleted task`);

  await ctx.reply("Choose Action", {
    reply_markup: mainActionsKeyboard,
  });
});

todos.callbackQuery("todo:find-many", async (ctx) => {
 // const todoInlineKeyboard = new InlineKeyboard();

//   array
//     .filter((el) => el.complete === false)
//     .map((todo) =>
//       todoInlineKeyboard.text(todo.title, `todo:choose_${todo.id}`).row(),
//     );

//   return array.length > 1
//     ? await ctx.reply("choose todo", {
//         reply_markup: todoInlineKeyboard,
//       })
//     : await ctx.reply("0 todos", { reply_markup: todoActionsKeyboard });
 await ctx.reply("todos")
});

todos.callbackQuery(/^todo:choose_([\w-]+)$/, async (ctx) => {
  const todoId = ctx.match[1];

//   const choosedTodo = array.find((el) => el.id === todoId);

//   if (!choosedTodo) {
//     return await ctx.reply("Ошибка: TODO не найден.");
//   }

//   const actionsKeyboard = new InlineKeyboard()
//     .text("edit", `todo:edit_${todoId}`)
//     .row()
//     .text("delete", `todo:delete_${todoId}`)
//     .row()
//     .text("complete", `todo:complete_${todoId}`)
//     .row();

//   return await ctx.reply(`Вы выбрали: ${choosedTodo.title}`, {
//     reply_markup: actionsKeyboard,
//   });
});

todos.callbackQuery("todo:create", async (ctx) => {
  await ctx.conversation.enter(createTodoConvo.name);
});
