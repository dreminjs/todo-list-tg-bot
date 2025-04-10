import { Composer } from "grammy";
import { CustomGeneralContext } from "../app/shared/interfaces";
import { editCallback } from "./handlers/callback/edit";
import { deleteCallback } from "./handlers/callback/delete";
import { chooseCallback } from "./handlers/callback/choose";
import { findManyCallback } from "./handlers/callback/find-many";
import { createCallback } from "./handlers/callback/create";

export const lists = new Composer<CustomGeneralContext>();

lists.callbackQuery("list:create", createCallback);

lists.callbackQuery("list:find-many", findManyCallback);

lists.callbackQuery(/^list:choose_([\w-]+)$/, chooseCallback);

lists.callbackQuery(/^list:delete_([\w-]+)$/, deleteCallback);

lists.callbackQuery(/^list:edit_([\w-]+)$/, editCallback);
