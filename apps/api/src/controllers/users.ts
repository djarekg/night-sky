import { prisma } from '#app/client/index.ts';
import type { UserModel } from '#app/generated/prisma/models.ts';
import type { Context } from 'koa';

export const getUsers = async (ctx: Context) => {
  try {
    const users = await prisma.user.findMany();
    ctx.body = users;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to fetch users' };
    console.error('Failed to fetch users', err);
  }
};

export const getUser = async (ctx: Context) => {
  const {
    params: { id },
  } = ctx;

  try {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    ctx.body = user;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: `Failed to fetch user: ${id}` };
    console.error(`Failed to fetch user: ${id}`, err);
  }
};

export const updateUser = async (ctx: Context) => {
  const {
    params: { id },
    request,
  } = ctx;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = (request as any).body as UserModel;

  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data,
    });

    ctx.body = user;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: `Failed to update user id: ${id}` };
    console.error(`Failed to update user id: ${id}`, err);
  }
};

export const updateUserActive = async (ctx: Context) => {
  const {
    params: { id },
    request,
  } = ctx;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { isActive } = (request as any).body as { isActive: boolean };

  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        isActive,
      },
    });

    ctx.body = user;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: `Failed to update active status for user id: ${id}` };
    console.error(`Failed to update active status for user id: ${id}`, err);
  }
};

export const createUser = async (ctx: Context) => {
  const { request } = ctx;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = (request as any).body as UserModel;

  try {
    const { id } = await prisma.user.create({
      select: {
        id: true,
      },
      data,
    });

    ctx.body = { id };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to create user' };
    console.error(`Failed to create user`, err);
  }
};

export const deleteUser = async (ctx: Context) => {
  const {
    params: { id },
  } = ctx;

  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });

    ctx.body = true;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: `Failed to delete user id: ${id}` };
    console.error(`Failed to delete user id: ${id}`, err);
  }
};
