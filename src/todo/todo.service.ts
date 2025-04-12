import { Prisma, Todo } from "@prisma/client";
import { prisma } from "../prisma";
import { deleteOne as deleteOneStep } from "../step/step.service";

export const constOneFroStep = async ({
  stepId,
  listId,
}: {
  stepId: string;
  listId: string;
}): Promise<Todo> => {
  const step = await deleteOneStep({ id: stepId });

  const todo = await createOne({
    content: step.content,
    list: {
      connect: {
        id: listId,
      },
    },
  });

  return todo;
};

export const createOne = async (
  data: Prisma.TodoCreateInput,
): Promise<Todo> => {
  return await prisma.todo.create({
    data,
  });
};

export const findMany = async (args: Prisma.TodoFindManyArgs) => {
  return await prisma.todo.findMany({ ...args });
};

export const findOne = async (
  args: Prisma.TodoFindUniqueArgs,
): Promise<Todo | null> => {
  return await prisma.todo.findUnique({ ...args });
};

export const updateOne = async (
  where: Prisma.TodoWhereUniqueInput,
  data: Prisma.TodoUpdateInput,
): Promise<Todo> => {
  return await prisma.todo.update({
    where,
    data,
  });
};

export const deleteOne = async (
  where: Prisma.TodoWhereUniqueInput,
): Promise<Todo> => {
  return await prisma.todo.delete({
    where,
  });
};

export const count = async (args: Prisma.TodoCountArgs): Promise<number> => {
  return await prisma.todo.count({ ...args });
};
