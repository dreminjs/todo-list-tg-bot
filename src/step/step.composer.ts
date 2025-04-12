import { Composer } from "grammy";
import { CustomGeneralContext } from "../app/shared/interfaces";
import { findManyCallbackByTodoId } from "./handlers/callbacks/find-many";
import { chooseCallback } from "./handlers/callbacks/choose";
import { deleteOneCallback } from "./handlers/callbacks/delete";
import { createOneCallback } from "./handlers/callbacks/create";

export const steps = new Composer<CustomGeneralContext>()

steps.callbackQuery(/^step:find-many-by-todo-id_([\w-]+)$/, findManyCallbackByTodoId)
steps.callbackQuery(/^step:choose_([\w-]+)$/, chooseCallback)
steps.callbackQuery(/^step:delete_([\w-]+)$/,deleteOneCallback)
steps.callbackQuery(/^step:create_([\w-]+)$/, createOneCallback)