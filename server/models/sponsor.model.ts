import {
	PgJson,
	foreignKey,
	pgTable,
	text,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core';
import { news } from './news.model';

// Sponsor Image Table
export const sponsorContent = pgTable('sponsor_content', {
	id: varchar('id', { length: 255 }).primaryKey(),
	imageUrl: varchar('image_url', { length: 255 }),
	videoUrl: varchar('video_url', { length: 255 }),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Sponsors Table
export const sponsors = pgTable('sponsors', {
	id: varchar('id', { length: 255 }).primaryKey(),
	name: varchar('name', { length: 255 }).unique().notNull(),
	logoUrl: varchar('logo_url', { length: 255 }),
	websiteUrl: varchar('website_url', { length: 255 }),
	image: varchar('image').references(() => sponsorContent.id),
	contactEmail: varchar('contact_email', { length: 255 }).notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Sponsor to News Table (Many-to-Many Relationship)
export const sponsorNews = pgTable('sponsor_news', {
	id: varchar('id', { length: 255 }).primaryKey(),
	newsId: varchar('news_id', { length: 255 })
		.references(() => news.id)
		.notNull(),
	sponsorId: varchar('sponsor_id', { length: 255 })
		.references(() => sponsors.id)
		.notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
