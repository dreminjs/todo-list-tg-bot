import { Composer } from "grammy";
import { mainActionsKeyboard } from "./shared/keyboards/main-actions.keyboard";
import { CustomGeneralContext } from "./shared/interfaces";

export const app = new Composer<CustomGeneralContext>()

app.callbackQuery("convo:exit",async (ctx) => {

    await ctx.conversation.exitAll()    

    await ctx.reply("choose action",{
        reply_markup: mainActionsKeyboard
    })
})
