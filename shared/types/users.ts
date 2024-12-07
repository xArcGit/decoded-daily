import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

export const User = z.object({
	id: z.string(),
	username: z.string(),
	name: z.string(),
	email: z.string().email(),
	is_verified: z.boolean(),
	password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const WriterUser = User.extend({
	role: z.enum(['writer', 'editor']),
	location: z.object({
		contry: z.string(),
		states: z.string(),
		city: z.string(),
	}),
	mobile: z
		.string()
		.min(10, 'Mobile number must be at least 10 characters long'),
});

export type User = z.infer<typeof User>;
export type WriterUser = z.infer<typeof WriterUser>;
