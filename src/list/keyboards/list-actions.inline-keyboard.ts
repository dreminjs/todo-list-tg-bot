import { InlineKeyboard } from "grammy";

export const hanldeShowListActionsInlineKeyboard = (listId: string) => {
      return new InlineKeyboard()
        .text("edit", `list:edit_${listId}`)
        .row()
        .text("see all todos", `todo:find-many-by-list-id_${listId}`)
        .row()
        .text("delete", `list:delete_${listId}`)
        .row()
        .text("return", "list:find-many");
}