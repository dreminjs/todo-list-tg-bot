import { Composer } from "grammy";
import { CustomGeneralContext } from "../app/shared/interfaces";
import { completeCallback } from "./handlers/callback/complete";
import { editCallback } from "./handlers/callback/edit";
import { deleteCallback } from "./handlers/callback/delete";
import { findManyByListIdCallback, findManyCallback } from "./handlers/callback/find-many";
import { chooseCallback } from "./handlers/callback/choose";
import { createCallback } from "./handlers/callback/create";

export const todos = new Composer<CustomGeneralContext>();

todos.callbackQuery(/^todo:complete_([\w-]+)$/, completeCallback)

todos.callbackQuery(/^todo:edit_([\w-]+)$/, editCallback);

todos.callbackQuery(/^todo:delete_([\w-]+)$/, deleteCallback);

todos.callbackQuery("todo:find-many", findManyCallback);

todos.callbackQuery(/^todo:find-many-by_([\w]+)$/, findManyByListIdCallback);

todos.callbackQuery(/^todo:choose_([\w-]+)$/, chooseCallback);

todos.callbackQuery("todo:create", createCallback);

