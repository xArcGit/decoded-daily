import { sentry } from '@hono/sentry';
import { httpStatus, httpStatusMessages } from '@util/http-status';
import { logger as customLogger } from '@util/logger';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { errorHandler } from './middlewares/error-handler';
import { restriction } from './middlewares/ip-restriction';
import { rateLimit } from './middlewares/rate-limit';
import { secureHeader } from './middlewares/secure-headers';
import { routes } from './routes';
import ApiError from './utils/api-error';

const app = new Hono();

app.use('*', sentry());
app.use('*', restriction());
app.use('*', rateLimit());
app.use('*', secureHeader());
app.use('*', cors());
app.use(
	'*',
	logger((message, ...rest) => customLogger.info(message, ...rest)),
);

const apiRoute = app.route('/', routes);

app.notFound(() => {
	throw new ApiError(
		httpStatus.NOT_FOUND,
		httpStatusMessages[httpStatus.NOT_FOUND],
	);
});

app.onError(errorHandler);

export default app;
export type AppType = typeof apiRoute;
