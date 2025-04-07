import { Bot, GrammyError, HttpError } from "grammy";
import { conversations } from "@grammyjs/conversations";
import * as dotenv from "dotenv";
import { CustomGeneralContext } from "./app/shared/interfaces";
import { registerCommands } from "./app/commands/start";
import { registerListModule } from "./list/list.module";
import { registerTodoModule } from "./todo/todo.module";
import { registerAppModule } from "./app/app.module";

dotenv.config();

const bot = new Bot<CustomGeneralContext>(process.env.TOKEN || "");

bot.use(conversations());

registerAppModule(bot)
registerTodoModule(bot)
registerListModule(bot);
registerCommands(bot);


bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Ошибка при обработке обновления ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Ошибка в запросе:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Не удалось связаться с Telegram:", e);
  } else {
    console.error("Неизвестная ошибка:", e);
  }
});

bot.start({ onStart: () => console.log("bot started!") });
