import { Conversation } from "@grammyjs/conversations";
import { Context, InlineKeyboard } from "grammy";
import { createOne } from "../step.service";
import { handleShowStepActionsKeyboard } from "../keyboards/step-actions.inline-keyboard";

export const handleCreateSteps = async ({
  isUserWantsContinue,
  convo,
  ctx,
  todoId,
  complete,
}: {
  isUserWantsContinue: boolean;
  ctx: Context;
  convo: Conversation;
  todoId: string;
  complete: boolean;
}) => {
  const stepInlineKeyboard = new InlineKeyboard()
    .text("yes", "step:yes")
    .text("no", "step:no");

  while (isUserWantsContinue) {
    await ctx.reply("do wanna add steps", {
      reply_markup: stepInlineKeyboard,
    });

    const {
      callbackQuery: { data: stepChoice },
    } = await convo.waitForCallbackQuery(["step:yes", "step:no"]);

    if (stepChoice == "step:no") {
      isUserWantsContinue = false;
      return await ctx.reply("choose action", {
        reply_markup: handleShowStepActionsKeyboard({
          stepId: todoId,
          isComplete: complete,
        }),
      });
    }

    await ctx.reply("write step!");

    const { message: newStep } = await convo.waitFor(":text");

    if (!newStep?.text) return;

    await convo.external(() =>
      createOne({
        content: newStep.text,
        todo: {
          connect: {
            id: todoId,
          },
        },
      }),
    );
  }
};
