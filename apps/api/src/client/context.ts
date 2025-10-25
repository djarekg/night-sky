import type { PrismaClient } from '#app/generated/prisma/client.ts';

export type Context = {
  prisma: PrismaClient;
};
