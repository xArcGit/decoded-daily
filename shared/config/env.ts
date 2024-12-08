import { z } from 'zod';

enum LogLevel {
	TRACE = 'trace',
	DEBUG = 'debug',
	INFO = 'info',
	WARN = 'warn',
	ERROR = 'error',
	FATAL = 'fatal',
}

const envSchema = z.object({
	ENV: z.enum(['production', 'development']),
	SERVER_PORT: z.preprocess(val => Number(val as string), z.number()),
	CLIENT_PORT: z.preprocess(val => Number(val as string), z.number()),
	LOG_LEVEL: z.nativeEnum(LogLevel),
	LOG_USE_COLOR: z.preprocess(val => val === 'true', z.boolean()),
	LOGGING: z.preprocess(val => val === 'true', z.boolean()),
	DB_URL: z.string(),
	HEADER_X_FRAME_OPTIONS: z.string(),
	HEADER_X_XSS_PROTECTION: z.string(),
	HEADER_X_CONTENT_TYPE_OPTIONS: z.string(),
	HEADER_X_PERMITTED_CROSS_DOMAIN_POLICIES: z.string(),
	HEADER_REFERRER_POLICY: z.string(),
	HEADER_CONTENT_SECURITY_POLICY: z.string(),
	IP_RESTRICTION_DENY_LIST: z.preprocess(
		val => (typeof val === 'string' ? val.split(',') : val),
		z.array(z.string().nullable()),
	),
	IP_RESTRICTION_ALLOW_LIST: z.preprocess(
		val => (typeof val === 'string' ? val.split(',') : val),
		z.array(z.string().nullable()),
	),
});

export const env = envSchema.parse(Bun.env);
