import { Context, InlineKeyboard } from "grammy";
import { findMany as findManyLists } from "../../list";
import { Conversation } from "@grammyjs/conversations";
import { handleCreateTodo } from "../actions/create-todo.action";
import { handleEmptyLists } from "../../list/actions/create-list.action";
import { mainActionsKeyboard } from "../../app/shared/keyboards/main-actions.keyboard";
import { createOne as createOneTodo } from "../todo.service";
import { createOne as createOneStep } from "../../step/step.service";

export async function createTodoConvo(convo: Conversation, ctx: Context) {
  const telegramId = ctx.chat?.id;

  let todoId = null;

  let isUserWantsToAddSteps = true;

  if (!telegramId) return;

  const lists = await convo.external(() =>
    findManyLists({
      where: {
        user: {
          telegramId,
        },
      },
    }),
  );

  if (lists.length === 0) {
    return await handleEmptyLists(ctx);
  }

  const listsInlineKeyboard = new InlineKeyboard();

  lists.forEach((el) => listsInlineKeyboard.text(el.name, el.id).row());

  await ctx.reply("choose list", {
    reply_markup: listsInlineKeyboard,
  });

  const {
    callbackQuery: { data: listIdChoice },
  } = await convo.waitForCallbackQuery([...lists.map((el) => el.id)]);

  await ctx.answerCallbackQuery();

  await ctx.reply("write todo");

  const {
    message: title,
    msgId: messageId,
    chatId,
  } = await convo.waitFor(":text");

  if (!title?.text) return;

  const descConfirmInlineKeyboard = new InlineKeyboard()
    .text("yes", "todo:description:yes")
    .text("no", "todo:description:no");

  await ctx.reply("do you wanna add description?", {
    reply_markup: descConfirmInlineKeyboard,
  });

  const {
    callbackQuery: { data: descriptionChoice },
  } = await convo.waitForCallbackQuery([
    "todo:description:yes",
    "todo:description:no",
  ]);

  if (descriptionChoice === "todo:description:yes") {
    await ctx.reply("write description!");

    const { message: description } = await convo.waitFor(":text");

    if (!description?.text) return;

    const todo = await convo.external(() =>
      createOneTodo({
        content: title.text,
        description: description?.text,
      }),
    );
    todoId = todo.id;
  } else {
    const todo = await convo.external(() =>
      createOneTodo({
        content: title.text,
      }),
    );

    todoId = todo.id;
  }

  const stepInlineKeyboard = new InlineKeyboard()
    .text("yes", "step:yes")
    .text("no", "step:no");

  while (isUserWantsToAddSteps) {
    await ctx.reply("do wanna add steps", {
      reply_markup: stepInlineKeyboard,
    });

    const {
      callbackQuery: { data: stepChoice },
    } = await convo.waitForCallbackQuery(["step:yes", "step:no"]);

    if (stepChoice == "step:no") {
      isUserWantsToAddSteps = false;
      return await ctx.reply("choose action", {
        reply_markup: mainActionsKeyboard,
      });
    }

    await ctx.reply("write step!")

    const { message: newStep } = await convo.waitFor(":text");
    
    if (!newStep?.text) return;

    await createOneStep({
      content: newStep.text,
      todo: {
        connect: {
          id: todoId,
        },
      },
    });
  }

  return await ctx.reply("choose action", {
    reply_markup: mainActionsKeyboard,
  });
  
}
