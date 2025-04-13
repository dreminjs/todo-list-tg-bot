import { Prisma, Step } from "@prisma/client";
import { prisma } from "../prisma";

export const createOne = async (
  data: Prisma.StepCreateInput,
): Promise<Step> => {
  return await prisma.step.create({
    data,
  });
};

export const findMany = async (
  where: Prisma.StepWhereInput,
): Promise<Step[]> => {
  return await prisma.step.findMany({
    where,
  });
};

export const deleteOne = async (
  where: Prisma.StepWhereUniqueInput,
): Promise<Step> => {
  return await prisma.step.delete({
    where,
  });
};

export const updateOne = async (
  where: Prisma.StepWhereUniqueInput,
  data: Prisma.StepUpdateInput,
): Promise<Step> => {
  return await prisma.step.update({
    where,
    data,
  });
};

export const findOne = async (
  where: Prisma.StepWhereUniqueInput,
): Promise<Step | null> => {
  return await prisma.step.findUnique({
    where,
  });
};

export const count = async (args: Prisma.StepCountArgs): Promise<number> => {
  return await prisma.step.count(args);
};
