import { InlineKeyboard } from "grammy";
import { findMany } from "../list.service";

export const handleShowListsInlineKeyboard = async (telegramId: number) => {
  const listsInlineKeyboard = new InlineKeyboard();

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

  listsInlineKeyboard.text("return", "convo:exit");

  return listsInlineKeyboard
};
