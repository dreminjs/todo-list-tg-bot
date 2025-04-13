import { CallbackQueryContext, InlineKeyboard } from "grammy";
import { CustomGeneralContext } from "../../../app/shared/interfaces";
import { findManyTodoConvo } from "../../conversations/find-many-todo.coversation";
import { findMany } from "../../todo.service";

export const findManyCallback = async (
  ctx: CallbackQueryContext<CustomGeneralContext>,
) => {
  await ctx.conversation.enter(findManyTodoConvo.name);
};

export const findManyByListIdCallback = async (
  ctx: CallbackQueryContext<CustomGeneralContext>,
) => {
  const listId = ctx.match[1];

  const todos = await findMany({
    where: {
      list: {
        id: listId,
      },
    },
  });

  if (todos.length === 0) {
    const actionsInlineKeyboard = new InlineKeyboard()
      .text("add todo!", "todo:create")
      .row()
      .text("return", "list:find-many");

   return await ctx.reply("u dont have any todos!", {
      reply_markup: actionsInlineKeyboard,
    });
  }

  const todosInlineKeyboard = new InlineKeyboard();

  todos.forEach((todo) =>
    todosInlineKeyboard
      .text(todo.content, `todo:choose_${todo.id}`)
      .row(),
  );

  todosInlineKeyboard.text("return", "list:find-many");

  await ctx.reply("choose todo for action",{
    reply_markup: todosInlineKeyboard
  })

};
