import { CallbackQueryContext } from "grammy";
import { CustomGeneralContext } from "../../../app/shared/interfaces";




export const createOneCallback = (ctx: CallbackQueryContext<CustomGeneralContext>) => {

    const todoId = ctx.match[1]
}

export const createManyCallback = (ctx: CallbackQueryContext<CustomGeneralContext>) => {

    const todoId = ctx.match[1]
}