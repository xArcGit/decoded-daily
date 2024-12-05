import { config } from '@config/app.config';
import { logger } from '@util/logger';
import app from './app';

const port = config.runner.port.server;

Bun.serve({
	port,
	fetch: app.fetch,
});

logger.info(`Server started on http://localhost:${port}`);
