import { CallbackQueryContext } from "grammy";
import { CustomGeneralContext } from "../../../app/shared/interfaces";
import { handleShowStepsInlineKeyboard } from "../../keyboards/steps.inline-keyboard";

export const findManyCallbackByTodoId = async (
  ctx: CallbackQueryContext<CustomGeneralContext>,
) => {
  await ctx.reply("choose step for action", {
    reply_markup:await handleShowStepsInlineKeyboard(ctx.match[1]),
  });
};
