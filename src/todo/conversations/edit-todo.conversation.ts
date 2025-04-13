import { Conversation } from "@grammyjs/conversations";
import { Context } from "grammy";
import { InlineKeyboard } from "grammy";
import { handleEditField } from "../actions/edit-todo.action";
import { handleShowtodoActionsInline } from "../keyboards/todo-actions.inline-keyboard";
import { findOne } from "../todo.service";

export async function editTodoConvo(
  convo: Conversation,
  ctx: Context,
  todoId: string,
) {
  let isUserWantsToEdit = true;

  while (isUserWantsToEdit) {
    const editTodoInlineKeyboard = new InlineKeyboard()
      .text("edit title", "todo:edit:title")
      .text("edit description", "todo:edit:description")
      .text("return", `todo:choose_${todoId}`);

    await ctx.reply("Choose what you want to edit", {
      reply_markup: editTodoInlineKeyboard,
    });

    const {
      callbackQuery: { data: editTodoChoice },
    } = await convo.waitForCallbackQuery([
      "todo:edit:title",
      "todo:edit:description",
    ]);

    switch (editTodoChoice) {
      case "todo:edit:title":
        isUserWantsToEdit = await handleEditField(
          "title",
          "title",
          ctx,
          convo,
          todoId,
        );
        break;
      case "todo:edit:description":
        isUserWantsToEdit = await handleEditField(
          "description",
          "description",
          ctx,
          convo,
          todoId,
        );
        break;
    }
  }

  const currentTodo = await convo.external(() =>
    findOne({ where: { id: todoId } }),
  );

  if (!currentTodo) return;

  handleShowtodoActionsInline({ ctx, todo: currentTodo });
}
