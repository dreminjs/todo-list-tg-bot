import { Conversation } from "@grammyjs/conversations";
import { Context } from "grammy";
import { createOne } from "../step.service";
import { promptText } from "../../app/shared/prompts/prompt-text";
import { promptConfirmAction } from "../../app/shared/prompts/prompt-confirm-action";
import { mainActionsKeyboard } from "../../app/shared/keyboards/main-actions.keyboard";

export async function handleStepsFlow(ctx: Context, convo: Conversation, todoId: string) {
  let continueAdding = true;

  while (continueAdding) {
    const addStep = await promptConfirmAction({ctx, convo, message: "do wanna add steps", yesData:"step:yes",noData: "step:no"});

    if (!addStep) {
      continueAdding = false;
      break;
    }

    const stepContent = await promptText(ctx, convo, "write step!");
    if (stepContent) {
      await convo.external(() =>
        createOne({
          content: stepContent,
          todo: { connect: { id: todoId } },
        })
      );
    }
  }

  await ctx.reply("choose action", {
    reply_markup: mainActionsKeyboard,
  });
}