import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

export const location = z.object({
	country: z.string(),
	state: z.string(),
	city: z.string(),
	areacode: z.string().optional(),
});

// Define the `news` schema
export const news = z.object({
	id: z.string(),
	title: z.string(),
	tags: z.array(z.string()),
	location: location,
	content: z.string(),
	auther_id: z.string(),
});

// Define the `newsDeltas` schema by extending `news`
export const newsDeltas = z.object({
	id: z.string(),
	news_id: z.string(),
	delta: z.string(),
	version: z.number(),
});

export type News = z.infer<typeof news>;
export type NewsDeltas = z.infer<typeof newsDeltas>;
