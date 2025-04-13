import { Conversation } from "@grammyjs/conversations";
import { Context, InlineKeyboard } from "grammy";
import { deleteOne, findOne } from "../todo.service";
import { handleShowTodosInlineKeyboard } from "../keyboards/todos.inline-keyboard";
import { handleShowtodoActionsInline } from "../keyboards/todo-actions.inline-keyboard";

export const deleteTodoConvo = async (
  convo: Conversation,
  ctx: Context,
  todoId: string,
) => {
  const confirmDeleteInlineKeyboard = new InlineKeyboard()
    .text("yes", "todo:delete:yes")
    .text("no", "todo:delete:no");

  await ctx.reply("confirm deletion", {
    reply_markup: confirmDeleteInlineKeyboard,
  });

  const {
    callbackQuery: { data },
  } = await convo.waitForCallbackQuery(["todo:delete:yes", "todo:delete:no"]);

  const currentTodo = await convo.external(() =>
    findOne({ where: { id: todoId } }),
  );

  if (!currentTodo?.listId) return;

  if (data == "todo:delete:no") {
    await ctx.reply("Deletion is rejected");

    return await handleShowtodoActionsInline({ ctx, todo: currentTodo });
  }

  await ctx.reply("Todo deleted!");

  return await Promise.all([
    deleteOne({
      id: todoId,
    }),
    handleShowTodosInlineKeyboard({ convo, ctx, listId: currentTodo.listId }),
  ]);
};
