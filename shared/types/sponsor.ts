import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

export const sponsorContent = z.object({
	id: z.string(),
	imageUrl: z.string().optional(),
	videoUrl: z.string().optional(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const sponsors = z.object({
	id: z.string(),
	name: z.string(),
	logoUrl: z.string().optional(),
	websiteUrl: z.string().optional(),
	image: z.string().optional(),
	contactEmail: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const sponsorNews = z.object({
	id: z.string(),
	newsId: z.string(),
	sponsorId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type SponsorContent = z.infer<typeof sponsorContent>;
export type Sponsors = z.infer<typeof sponsors>;
export type SponsorNews = z.infer<typeof sponsorNews>;
