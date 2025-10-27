import { prisma } from '#app/client/index.ts';
import { TOKEN_SECRET } from '#app/config.ts';
import { compareHash } from '#app/crypto/hash.ts';
import { Role } from '#app/generated/prisma/enums.ts';
import type { AuiContext } from '#app/types/index.ts';
import jwt from 'jsonwebtoken';
import type { Context } from 'koa';

export const getUser = async (ctx: AuiContext<{ username: string }>) => {
  const {
    params: { username },
  } = ctx;

  const user = await prisma.user.findFirst({
    where: {
      email: username,
    },
  });

  ctx.body = user;
};

export const signin = async (ctx: AuiContext<{ username: string; password: string }>) => {
  const { username, password } = ctx.request.body;
  const user = await prisma.user.findFirst({
    select: {
      id: true,
      userCredential: {
        select: {
          password: true,
          role: true,
        },
      },
    },
    where: {
      email: username,
    },
  });

  if (!user) {
    ctx.status = 404; // NOT FOUND
    return;
  }

  // Validate password against stored hash
  const hashPassword = user.userCredential?.password ?? '';
  const isValid = compareHash(password, hashPassword);

  if (isValid) {
    // Credentials are valid, so return a JWT
    jwt.sign({ username }, TOKEN_SECRET, {
      expiresIn: '1h',
    });

    ctx.body = { userId: user.id, role: user.userCredential?.role ?? Role.USER };
    return;
  }

  ctx.status = 401; // UNAUTHORIZED
};

export const signout = (ctx: Context) => {
  jwt.sign({}, TOKEN_SECRET, {
    expiresIn: '1s', // Expire the token immediately
  });

  ctx.body = { success: true };
};
