import { Bot } from "grammy";
import { mainActionsKeyboard } from "../shared/keyboards/main-actions.keyboard";
import { findOrCreateUser } from "../../user/user.service";
import { CustomGeneralContext } from "../shared/interfaces";

export function registerCommands(bot: Bot<CustomGeneralContext>) {
  bot.command("start", async (ctx) => {
    await Promise.all([
      findOrCreateUser(ctx.chat.id),
      ctx.reply(`Hello, ${ctx.chat.first_name}! Choose Actions!`, {
        reply_markup: mainActionsKeyboard,
      }),
    ]);
  });
}
