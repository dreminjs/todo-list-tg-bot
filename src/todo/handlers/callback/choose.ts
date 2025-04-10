import { CallbackQueryContext, InlineKeyboard } from "grammy";
import { CustomGeneralContext } from "../../../app/shared/interfaces";
import { findOne } from "../../todo.service";

export const chooseCallback = async (
  ctx: CallbackQueryContext<CustomGeneralContext>,
) => {
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
    .row()
    .text("exit", "convo:exit");

  return await ctx.reply(`Вы выбрали: ${choosedTodo?.content}`, {
    reply_markup: actionsKeyboard,
  });
};
