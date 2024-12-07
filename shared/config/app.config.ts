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
	db: {
		url: env.DB_URL,
	},
	log: {
		level: env.LOG_LEVEL,
		color: env.LOG_USE_COLOR,
		logging: env.LOGGING,
	},
	headers: {
		xFrameOptions: env.HEADER_X_FRAME_OPTIONS,
		xXssProtection: env.HEADER_X_XSS_PROTECTION,
		xContentTypeOptions: env.HEADER_X_CONTENT_TYPE_OPTIONS,
		xPermittedCrossDomainPolicies: env.HEADER_X_PERMITTED_CROSS_DOMAIN_POLICIES,
		referrerPolicy: env.HEADER_REFERRER_POLICY,
		contentSecurityPolicy: env.HEADER_CONTENT_SECURITY_POLICY,
	},
	ipRestriction: {
		denyList: env.IP_RESTRICTION_DENY_LIST,
		allowList: env.IP_RESTRICTION_ALLOW_LIST,
	},
};
