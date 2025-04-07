import { Composer, InlineKeyboard } from "grammy";
import { CustomGeneralContext } from "../app/shared/interfaces";
import { createListConvo, editListConvo } from "./list.coversation";
import { deleteOne, findMany } from "./list.service";
import { mainActionsKeyboard } from "../app/shared/keyboards/main-actions.keyboard";

export const lists = new Composer<CustomGeneralContext>();

lists.callbackQuery("list:create", async (ctx) => {
  return await ctx.conversation.enter(createListConvo.name);
});

lists.callbackQuery("list:find-many", async (ctx) => {
  const listsInlineKeyboard = new InlineKeyboard();

  const telegramId = ctx.chat?.id;

  if (ctx.chat?.id) {
    const lists = await findMany({
      where: {
        user: {
          telegramId,
        },
      },
    });
    lists.forEach((list) => {
      listsInlineKeyboard.text(list.name, `list:choose_${list.id}`).row();
    });
  }

  listsInlineKeyboard.text("exit","convo:exit")

  ctx.reply("Choose list", {
    reply_markup: listsInlineKeyboard,
  });
});

lists.callbackQuery(/^list:choose_([\w-]+)$/, async (ctx) => {
  const listId = ctx.match[1];

  const listActionsInlineKeyboard = new InlineKeyboard()
    .text("edit", `list:edit_${listId}`)
    .text("see all todos", `todo:find-many_${listId}`)
    .text("delete", `list:delete_${listId}`).row()
    .text("exit","convo:exit")

  await ctx.reply("choose actions", {
    reply_markup: listActionsInlineKeyboard,
  });
});

lists.callbackQuery(/^list:delete_([\w-]+)$/, async (ctx) => {
  const listId = ctx.match[1];

 const deleteTodo = await deleteOne({
    where: {
      id: listId,
    },
  });

  return ctx.reply(`${deleteTodo.name} - deleted!`,{
    reply_markup: mainActionsKeyboard
  });
});


lists.callbackQuery(/^list:edit_([\w-]+)$/, async (ctx) => {
  await ctx.conversation.enter(editListConvo.name, ctx.match[1]);
});
