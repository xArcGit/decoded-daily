import {
	foreignKey,
	pgTable,
	primaryKey,
	serial,
	text,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core';
import { user } from './user.model';

// Location Table
export const location = pgTable('location', {
	id: varchar('id', { length: 255 }).primaryKey(),
	country: text('country').notNull(),
	state: text('state'),
	city: text('city'),
	areaCode: varchar('area_code', { length: 10 }),
	createdAt: timestamp('created_at').notNull(),
});

// News Table
export const news = pgTable('news', {
	id: varchar('id', { length: 255 }).primaryKey(),
	title: text('title').notNull(),
	locationId: varchar('location_id', { length: 255 })
		.references(() => location.id)
		.notNull(),
	content: text('content').notNull(),
	authorId: varchar('author_id', { length: 255 })
		.references(() => user.id)
		.notNull(),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
});

// Tags Table
export const tags = pgTable('tag', {
	id: varchar('id', { length: 255 }).primaryKey(),
	name: varchar('name', { length: 255 }).unique().notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
});

// News Tags Table (Join Table for Many-to-Many Relationship)
export const newsTags = pgTable(
	'news_tag',
	{
		newsId: varchar('news_id', { length: 255 })
			.references(() => news.id)
			.notNull(),
		tagId: varchar('tag_id', { length: 255 })
			.references(() => tags.id)
			.notNull(),
	},
	table => ({
		pk: primaryKey(table.newsId, table.tagId),
	}),
);

// News Delta Table (For Content Versioning)
export const newsDelta = pgTable('news_delta', {
	id: serial('id').primaryKey(),
	newsId: varchar('news_id', { length: 255 })
		.references(() => news.id)
		.notNull(),
	content: text('content').notNull(),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
});
