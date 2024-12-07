import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { location } from './news';

export const User = z.object({
	id: z.string(),
	username: z.string(),
	name: z.string(),
	email: z.string().email(),
	avtar: z.string().url(),
	password: z.string(),
});

export const WriterUser = User.extend({
	role: z.enum(['writer', 'editor']),
	location: location,
	mobile: z.string().length(15),
});

export const guestuser = z.object({
	id: z.string(),
	deviceId: z.string(),
	location: location,
});

export type User = z.infer<typeof User>;
export type WriterUser = z.infer<typeof WriterUser>;
export type guestuser = z.infer<typeof guestuser>;
