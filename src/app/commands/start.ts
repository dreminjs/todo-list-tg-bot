import { Bot } from "grammy";
import { mainActionsKeyboard } from "../shared/keyboards/main-actions.keyboard";
import { findOrCreateUser } from "../../user/user.service";
import { CustomGeneralContext } from "../shared/interfaces";

export function registerCommands(bot: Bot<CustomGeneralContext>) {
  bot.command("start", async (ctx) => {
    await findOrCreateUser(ctx.chat.id);
    await ctx.reply(`Hello, ${ctx.chat.first_name}! Choose Actions!`, {
      reply_markup: mainActionsKeyboard,
    });
  });
}