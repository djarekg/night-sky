import { getStates } from '#app/controllers/states.ts';
import Router from '@koa/router';

const router = new Router();

router.get('/states', getStates);

export default router;
