import { Conversation } from "@grammyjs/conversations";
import { Context } from "grammy";
import { mainActionsKeyboard } from "../../app/shared/keyboards/main-actions.keyboard";
import { updateOne } from "../todo.service";
import { InlineKeyboard } from "grammy";
import { handleEditField } from "../actions/update-todo.action";

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
      .text("exit", "convo:exit");

    await ctx.reply("Choose what you want to edit", {
      reply_markup: editTodoInlineKeyboard,
    });

    const {
      callbackQuery: { data: editTodoChoice },
    } = await convo.waitForCallbackQuery([
      "todo:edit:title",
      "todo:edit:description",
      "convo:exit",
    ]);

    if (editTodoChoice === "convo:exit") break;

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

  await ctx.reply("Choose Action", {
    reply_markup: mainActionsKeyboard,
  });
}
