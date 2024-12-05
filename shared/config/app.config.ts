import { env } from './env';

export const config = {
	client: {
		port: env.CLIENT_PORT,
	},
	server: {
		port: env.SERVER_PORT,
		env: env.ENV,
	},
	log: {
		level: env.LOG_LEVEL,
		color: env.LOG_USE_COLOR,
	},
};
