import { ipRestriction } from 'hono/ip-restriction';
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
	headers: {},
	ipRestriction: {
		denyList: env.IP_RESTRICTION_DENY_LIST,
		allowList: env.IP_RESTRICTION_ALLOW_LIST,
	},
	logging: {
		enabled: env.LOGGING_ENABLED,
	},
};
