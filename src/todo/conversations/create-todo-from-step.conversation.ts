import { Conversation } from "@grammyjs/conversations";
import { Context } from "grammy";
import { handleStepsFlow } from "../../step/actions/create-step.action";
import { selectList } from "../actions/find-many.todo.action";
import { createOne as createOneTodo } from "../todo.service";
import { deleteOne as deleteOneStep,findOne as findOneStep } from "../../step/step.service";

export const createTodoFromStepConvo = async (
  convo: Conversation,
  ctx: Context,
  stepId: string,
) => {
  const telegramId = ctx.chat?.id;
  if (!telegramId) return;

  const listId = await selectList(ctx, convo);
  if (!listId) return;

  const step = await convo.external(() =>
    findOneStep({
      id: stepId
    }),
  );

  if (!step) {
    await ctx.reply("step not found");
    return;
  }

  const todo = await convo.external(() =>
    createOneTodo({
      content: step.content,
      list: { connect: { id: listId } },
    }),
  );


  await convo.external(() =>
    deleteOneStep({
      id: stepId,
    }),
  );

  await handleStepsFlow(ctx, convo, todo.id);
};
