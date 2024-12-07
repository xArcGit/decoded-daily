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
	SERVER_PORT: z.preprocess(val => Number(val), z.number()),
	CLIENT_PORT: z.preprocess(val => Number(val), z.number()),
	LOG_LEVEL: z.nativeEnum(LogLevel),
	LOG_USE_COLOR: z.preprocess(
		val => val === 'true' || val === true,
		z.boolean(),
	),
	IP_RESTRICTION_DENY_LIST: z.preprocess(
		val => (typeof val === 'string' ? val.split(',') : val),
		z.array(z.string().nullable()),
	),
	IP_RESTRICTION_ALLOW_LIST: z.preprocess(
		val => (typeof val === 'string' ? val.split(',') : val),
		z.array(z.string().nullable()),
	),
	LOGGING_ENABLED: z.preprocess(
		val => val === 'true' || val === true,
		z.boolean(),
	),
	DB_URI: z.string(),
});

export const env = envSchema.parse(Bun.env);
