import { InlineKeyboard } from "grammy";

export const handleShowtodoActionsInline = ({
  todoId,
  isComplete,
  listId
}: {
  todoId: string;
  listId: string
  isComplete: boolean;
}) => {
  const isCompletedLabel = isComplete ? "uncomplete" : "complete";

  return new InlineKeyboard()
    .text("edit", `todo:edit_${todoId}`)
    .row()
    .text("delete", `todo:delete_${todoId}`)
    .row()
    .text(isCompletedLabel, `todo:toggle-complete_${todoId}`)
    .row()
    .text("see steps", `step:find-many-by-todo-id_${todoId}`)
    .row()
    .text("return", `todo:find-many-by-list-id_${listId}`);
};
