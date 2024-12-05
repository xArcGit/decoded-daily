import { config } from '@config/app.config';
import { logger } from '@util/logger';
import app from './app';

const port = config.server.port;

Bun.serve({
	development: config.server.env === 'development',
	port,
	fetch: app.fetch,
});

logger.info(`Server started on http://localhost:${port}`);
