import { prisma } from "../../prisma";

export async function findOrCreateUser(telegramId: number) {
  return await prisma.user.upsert({
    where: { telegramId },
    update: {},
    create: { telegramId },
  });
}
