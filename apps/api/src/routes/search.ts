import { getSearchResults } from '#app/controllers/search.ts';
import Router from '@koa/router';

const router = new Router();

router.post('/search', getSearchResults);

export default router;
