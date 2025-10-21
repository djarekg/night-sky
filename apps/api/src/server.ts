import cors from '@koa/cors';
import Koa from 'koa';
import { koaBody } from 'koa-body';
import { CORS_ORIGIN, PORT } from './config.ts';
import {
  authRouter,
  customerContactsRouter,
  customersRouter,
  dashboardRouter,
  productsRouter,
  searchRouter,
  statesRouter,
  usersRouter,
} from './routes/index.ts';

const app = new Koa();

app.use(
  cors({
    allowMethods: ['GET', 'PUT', 'DELETE', 'POST', 'OPTIONS'],
    origin: CORS_ORIGIN,
  })
);
app.use(koaBody());

// Setup api routes
app.use(authRouter.routes());
app.use(usersRouter.routes());
app.use(statesRouter.routes());
app.use(searchRouter.routes());
app.use(customersRouter.routes());
app.use(customerContactsRouter.routes());
app.use(productsRouter.routes());
app.use(dashboardRouter.routes());

app.listen(PORT, () => console.log(`🚀 Server ready at: http://localhost:${PORT}`));
