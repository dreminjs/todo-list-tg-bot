"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const bot = new grammy_1.Bot("");
bot.command("start", (ctx) => ctx.reply("Добро пожаловать. Запущен и работает!"));
bot.on("message", (ctx) => ctx.reply("Получил другое сообщение!"));
bot.start({ onStart: () => console.log("bot started!") });
//# sourceMappingURL=index.js.map