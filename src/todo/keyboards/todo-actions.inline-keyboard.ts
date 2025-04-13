import { Todo } from "@prisma/client";
import { Context, InlineKeyboard } from "grammy";
import { count as countSteps } from "../../step/step.service";

export const handleShowtodoActionsInline = async ({
  todo,
  ctx,
}: {
  todo: Todo;
  ctx: Context;
}) => {
  const { id: todoId, listId, complete } = todo;

  const isCompletedLabel = complete ? "uncomplete" : "complete";

  const countStepsNumber = await countSteps({ where: { todoId } });

  const textInfo = `name: ${todo?.content}${
    todo?.description ? `\ndescription: ${todo?.description}` : ""
  }\ncomplete: ${
    todo?.complete ? "✅" : "❌"
  }\ncount steps: ${countStepsNumber}`;

  const inlineKeyboard = new InlineKeyboard()
    .text("edit", `todo:edit_${todoId}`)
    .row()
    .text("delete", `todo:delete_${todoId}`)
    .row()
    .text(isCompletedLabel, `todo:toggle-complete_${todoId}`)
    .row()
    .text("see steps", `step:find-many-by-todo-id_${todoId}`)
    .row()
    .text("return", `todo:find-many-by-list-id_${listId}`);

  await ctx.reply(`${textInfo}`, {
    reply_markup: inlineKeyboard,
  });
};
