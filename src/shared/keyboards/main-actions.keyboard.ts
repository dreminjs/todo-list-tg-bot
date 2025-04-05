import { InlineKeyboard } from "grammy";

export const mainActionsKeyboard = new InlineKeyboard()
  .text("add todo to my todos!", "todo:create").row()
  .text("my todos", "todo:find-many").row()
  .text("add list","list:create").row()
  .text('my lists',"list:find-many")
