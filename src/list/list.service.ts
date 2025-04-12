import { List, Prisma } from "@prisma/client";
import { prisma } from "../prisma";

export async function createOne(data: Prisma.ListCreateInput): Promise<List> {
  return await prisma.list.create({
    data,
  });
}

export async function findMany(args: Prisma.ListFindManyArgs): Promise<List[]> {
  return await prisma.list.findMany({
    ...args
  });
}

export async function deleteOne(args: Prisma.ListDeleteArgs) {
  return await prisma.list.delete(args)
}

export const updateOne = async (
  where: Prisma.ListWhereUniqueInput,
  data: Prisma.ListUpdateInput,
): Promise<List> => {
  return await prisma.list.update({
    where,
    data,
  });
};

export async function findOne(args: Prisma.ListFindFirstArgs) {
    return await prisma.list.findFirst(args)
}