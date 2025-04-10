import { Context, InlineKeyboard } from "grammy";
import { findMany as findManyLists } from "../../list";
import { Conversation } from "@grammyjs/conversations";
import { handleCreateTodo } from "../actions/create-todo.action";
import { createOne as createOneStep } from "../../step/step.service";

export async function createTodoConvo(convo: Conversation, ctx: Context) {
  const telegramId = ctx.chat?.id;

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

  const listsInlineKeyboard = new InlineKeyboard();

  lists.forEach((el) => listsInlineKeyboard.text(el.name, el.id).row().row());

  await ctx.reply("choose list", {
    reply_markup: listsInlineKeyboard.row().text("exit", "convo:exit"),
  });

  const {
    callbackQuery: { data: listIdCallbackQueryAnswer },
  } = await convo.waitForCallbackQuery([...lists.map((el) => el.id)]);

  const {
    message: title,
    msgId: messageId,
    chatId,
  } = await convo.waitFor(":text",{
    otherwise: ctx => ctx.reply("write todo!")
  });

  if (!title?.text || !listIdCallbackQueryAnswer) return;

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

  if (descriptionChoice === "todo:description:no") {
    await handleCreateTodo({
      ctx,
      chatId,
      convo,
      messageId,
      createTodoPayload: {
        content: title.text,
        list: {
          connect: {
            id: listIdCallbackQueryAnswer,
          },
        },
      },
    });

    const stepInlineKeyboard = new InlineKeyboard()
    .text("yes", "step:yes")
    .text("no", "step:no");

  await ctx.reply("do wanna add steps", {
    reply_markup: stepInlineKeyboard,
  });

  const {
    callbackQuery: { data: stepChoice },
  } = await convo.waitForCallbackQuery(["step:yes", "step:no"]);

  let isUserWantsToAddSteps = false;
  
  if(stepChoice === "step:yes"){

    const {message: newStep } = await convo.waitFor(":text",{
      otherwise: ctx => ctx.reply("write new step!")
    })
    
    if(!newStep?.text) return;

    await createOneStep({
      content: newStep!.text,
      todo: {
        create: undefined,
      }
    })

    isUserWantsToAddSteps = true
  }


  while (isUserWantsToAddSteps) {
    isUserWantsToAddSteps = false;
  }
  }

  const { message: description } = await convo.waitFor(":text",{
    otherwise: ctx => ctx.reply("Write description!")
  });

  await handleCreateTodo({
    ctx,
    chatId,
    convo,
    messageId,
    createTodoPayload: {
      content: title.text,
      list: {
        connect: {
          id: listIdCallbackQueryAnswer,
        },
      },
      description: description!.text,
    },
  });
}
