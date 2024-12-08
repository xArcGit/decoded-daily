import { Hono } from 'hono';
import { route as newsRoute } from './news.route';
import { route as sponsorRoute } from './sponsor.route';
import { route as userRoute } from './user.route';

export const routes = new Hono();

routes
	.basePath('/api')
	.route('/news', newsRoute)
	.route('/sponsor', sponsorRoute)
	.route('/user', userRoute);
