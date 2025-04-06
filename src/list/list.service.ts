import { List, Prisma } from "@prisma/client";
import { prisma } from "../prisma";

export async function createOne(data: Prisma.ListCreateInput): Promise<List> {
  return await prisma.list.create({
    data,
  });
}

export async function findMany(telegramId: number): Promise<List[]> {
  return await prisma.list.findMany({
    where: {
      user: {
        telegramId,
      },
    },
  });
}
