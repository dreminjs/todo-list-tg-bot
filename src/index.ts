import {
  Bot,
  Context,
  GrammyError,
  HttpError,
  InlineKeyboard,
  session,
  SessionFlavor,
} from "grammy";

import {
  Conversation,
  type ConversationFlavor,
  conversations,
  createConversation,
} from "@grammyjs/conversations";

import { v4 } from "uuid";

import * as dotenv from "dotenv";

dotenv.config()

interface ISessionTodo {
  todoId: string | null;
}

type CustomContext = Context & SessionFlavor<ISessionTodo>;

type CustomGeneralContext = ConversationFlavor<CustomContext>;

type FindManyContext = Context;

type FindAllTodosConvo = Conversation<CustomGeneralContext, FindManyContext>;

let array = [] as { title: string; complete: boolean; id: string }[];

const bot = new Bot<CustomGeneralContext>(process.env.TOKEN || "");

// TODO: implemepting interaction with db and auth

bot.use(conversations());

bot.use(session({ initial }));

function initial(): ISessionTodo {
  return { todoId: null };
}

const todoActionsKeyboard = new InlineKeyboard()
  .text("add todo", "todo:create").row()
  .text("my todos", "todo:find-many");

async function createTodoConvo(convo: Conversation, ctx: Context) {
  await ctx.reply("Write Todo!");

  const { message, msgId: messageId, chatId } = await convo.waitFor(":text");

  if (message?.text) {
    array.push({ title: message.text, id: v4(), complete: false });
  } else {
    ctx.reply("Write someting");
  }

  await ctx.reply("Added!", {
    reply_parameters: {
      message_id: messageId,
    },
  }),
    await Promise.all([
      ctx.api.setMessageReaction(chatId, messageId, [
        { type: "emoji", emoji: "👍" },
      ]),

      ctx.reply("Choose Action", {
        reply_markup: todoActionsKeyboard,
      }),
    ]);
}

async function editTodoConvo(
  convo: Conversation,
  ctx: Context,
  todoId: string,
) {
  await ctx.reply("Edit Todo!");

  const { message, msgId: messageId, chatId } = await convo.waitFor(":text");

  const index = array.findIndex((el) => el.id === todoId);

  if (message?.text) {
    array[index].title = message?.text;
  } else {
    ctx.reply("Something go wrong!");
  }

  await ctx.reply(`${array[index].title} - new title`);

  await ctx.reply("Choose Action", {
    reply_markup: todoActionsKeyboard,
  });
}

bot.use(createConversation(createTodoConvo));

bot.use(createConversation(editTodoConvo));

bot.callbackQuery(/^todo:complete_([\w-]+)$/, async (ctx) => {
  const todoId = ctx.match[1];

  const currentTodoIdx = array.findIndex((el) => el.id === todoId);

  array[currentTodoIdx].complete = true;

  await ctx.reply(`${array[currentTodoIdx].title} - is complete`);

  await ctx.reply("Choose Action", {
    reply_markup: todoActionsKeyboard,
  });
});

bot.callbackQuery(/^todo:edit_([\w-]+)$/, async (ctx) => {
  await ctx.conversation.enter(editTodoConvo.name, ctx.match[1]);
});

bot.callbackQuery(/^todo:delete_([\w-]+)$/, async (ctx) => {
  const todoId = ctx.match[1];

  const index = array.findIndex((el) => el.id === todoId);

  const deletedTodoTitle = array[index].title;

  array = array.filter((el) => el.id !== todoId);

  await ctx.reply(`${deletedTodoTitle} - deleted task`);

  await ctx.reply("Choose Action", {
    reply_markup: todoActionsKeyboard,
  });
});

bot.callbackQuery("todo:find-many", async (ctx) => {
  const todoInlineKeyboard = new InlineKeyboard();

  array
    .filter((el) => el.complete === false)
    .map((todo) =>
      todoInlineKeyboard.text(todo.title, `todo:choose_${todo.id}`).row(),
    );

  return await ctx.reply("choose todo", {
    reply_markup: todoInlineKeyboard,
  });
});

bot.callbackQuery(/^todo:choose_([\w-]+)$/, async (ctx) => {
  const todoId = ctx.match[1];

  const choosedTodo = array.find((el) => el.id === todoId);

  if (!choosedTodo) {
    return await ctx.reply("Ошибка: TODO не найден.");
  }

  const actionsKeyboard = new InlineKeyboard()
    .text("edit", `todo:edit_${todoId}`).row()
    .text("delete", `todo:delete_${todoId}`).row()
    .text("complete", `todo:complete_${todoId}`).row()

  return await ctx.reply(`Вы выбрали: ${choosedTodo.title}`, {
    reply_markup: actionsKeyboard,
  });
});

bot.callbackQuery("todo:create", async (ctx) => {
  await ctx.conversation.enter(createTodoConvo.name);
});

bot.command("start", async (ctx) => {
  await ctx.reply("Choose Action", {
    reply_markup: todoActionsKeyboard,
  });
});

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Ошибка при обработке обновления ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Ошибка в запросе:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Не удалось связаться с Telegram:", e);
  } else {
    console.error("Неизвестная ошибка:", e);
  }
});

bot.start({ onStart: () => console.log("bot started!") });
