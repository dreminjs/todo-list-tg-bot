import { CallbackQueryContext, InlineKeyboard } from "grammy";
import { CustomGeneralContext } from "../../../app/shared/interfaces";
import { findMany } from "../../step.service";

export const findManyCallbackByTodoId = async (
  ctx: CallbackQueryContext<CustomGeneralContext>,
) => {
  const todoId = ctx.match[1];

  const steps = await findMany({ todoId });

  if (steps.length === 0) {
    const actionsInlineKeyboard = new InlineKeyboard()
      .text(`add step!`, `step:create_${todoId}`)
      .row()
      .text("exit", "convo:exit");

    return await ctx.reply("you dont have any todos", {
      reply_markup: actionsInlineKeyboard,
    });
  }

  const stepsInlineKeyboard = new InlineKeyboard();

  steps.forEach((step) =>
    stepsInlineKeyboard.text(step.content, `step:choose_${step.id}`).row(),
  );

  await ctx.reply("choose step for action", {
    reply_markup: stepsInlineKeyboard.text("return",`todo:choose_${todoId}`),
  });
};
