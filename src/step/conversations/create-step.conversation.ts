import { Conversation } from "@grammyjs/conversations";
import { Context } from "grammy";
import { createOne } from "../step.service";

export const createStepConvo = async (
  convo: Conversation,
  ctx: Context,
  todoId: string,
) => {
  await ctx.reply("write step!");

  const { message } = await convo.waitFor(":text");

  if (!message?.text) return;

  await createOne({ content: message.text, todo: { connect: { id: todoId } } });
};
