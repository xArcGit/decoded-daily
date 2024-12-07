import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

// Define the `news` schema
export const news = z.object({
	id: z.string(),
	title: z.string(),
	tags: z.array(z.string()),
	location: z.object({
		country: z.string(),
		state: z.string(),
		city: z.string(),
		areacode: z.string().optional(),
	}),
	content: z.string(),
	auther_id: z.string(),
	updatedAt: z.string().refine(date => Date.parse(date), {
		message: 'Invalid date format for updatedAt',
	}),
	createdAt: z.string().refine(date => Date.parse(date), {
		message: 'Invalid date format for createdAt',
	}),
});

// Define the `newsDeltas` schema by extending `news`
export const newsDeltas = news.extend({
	news_id: z.string(),
	version: z.number(),
	delta_tag: z.string(),
});

export type News = z.infer<typeof news>;
export type NewsDeltas = z.infer<typeof newsDeltas>;
