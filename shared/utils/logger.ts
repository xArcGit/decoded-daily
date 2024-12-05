import pino from 'pino';
import { config } from '../config/app.config';

export const logger = pino({
	level: config.log.level,
	transport: {
		target: 'pino-pretty',
		options: {
			colorize: config.log.color,
			translateTime: 'SYS:standard',
		},
	},
});
