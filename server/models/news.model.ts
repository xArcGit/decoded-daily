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

// News Tags Table (Many-to-Many Relationship between News and Tags)
export const newsTags = pgTable(
	'news_tags',
	{
		newsId: varchar('news_id', { length: 255 })
			.references(() => news.id)
			.notNull(),
		tag: varchar('tag', { length: 255 }).notNull(),
	},
	table => ({
		pk: primaryKey(table.newsId, table.tag),
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
