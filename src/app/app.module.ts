import { Bot } from "grammy";
import { CustomGeneralContext } from "./shared/interfaces";
import { app } from "./app.composer";

export const registerAppModule = (bot: Bot<CustomGeneralContext>) => {
    bot.use(app)
}