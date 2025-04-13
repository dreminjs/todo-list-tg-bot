import { CallbackQueryContext } from "grammy";
import { CustomGeneralContext } from "../../../app/shared/interfaces";
import { findOne } from "../../todo.service";
import { handleShowtodoActionsInline } from "../../keyboards/todo-actions.inline-keyboard";

export const chooseCallback = async (
  ctx: CallbackQueryContext<CustomGeneralContext>,
) => {

  await ctx.conversation.exitAll()

  const todoId = ctx.match[1];

  const choosedTodo = await findOne({
    where: {
      id: todoId,
    },
    include: {
      list: true,
    },
  });

  if(!choosedTodo?.listId) return ctx.reply("no list id!")

  const textInfo = `name: ${choosedTodo?.content}${
    choosedTodo?.description ? `\ndescription: ${choosedTodo?.description}` : ""
  }\ncomplete: ${choosedTodo?.complete ? "✅" : "❌"}\n`;

  return await ctx.reply(`${textInfo}`, {
    reply_markup: handleShowtodoActionsInline({
      isComplete: Boolean(choosedTodo?.complete),
      todoId,
      listId: choosedTodo?.listId
    }),
  });
};
