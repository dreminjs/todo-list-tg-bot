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
    include: {
      list: true,
    },
  });

  const isCompletedLabel = choosedTodo?.complete ? "uncomplete" : "complete"

  const actionsKeyboard = new InlineKeyboard()
    .text("edit", `todo:edit_${todoId}`)
    .row()
    .text("delete", `todo:delete_${todoId}`)
    .row()
    .text(isCompletedLabel, `todo:toggle-complete_${todoId}`)
    .row()
    .text("see steps",`step:find-many-by-todo-id_${todoId}`)
    .row()
    .text("exit", "convo:exit");

  const textInfo = `name: ${choosedTodo?.content}${
    choosedTodo?.description ? `\ndescription: ${choosedTodo?.description}` : ""
  }\ncomplete: ${choosedTodo?.complete ? "✅" : "❌"}\n`;

  return await ctx.reply(`${textInfo}`, {
    reply_markup: actionsKeyboard,
  });
};
