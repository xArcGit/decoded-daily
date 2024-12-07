import {
	foreignKey,
	pgEnum,
	pgTable,
	primaryKey,
	text,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core';
import { location } from './news.model';

// Define the Role Enum
const roleEnum = pgEnum('role', ['user', 'writer', 'moderator', 'bot']);

// Users Table
export const user = pgTable('users', {
	id: varchar('id', { length: 255 }).primaryKey(),
	username: varchar('username', { length: 255 }).unique().notNull(),
	email: varchar('email', { length: 255 }).unique().notNull(),
	password: text('password').notNull(),
	role: roleEnum('role').default('user').notNull(),
	avatar: text('avatar'),
	locationId: varchar('location_id', { length: 255 })
		.references(() => location.id)
		.notNull(),
	phone: varchar('phone', { length: 15 }).unique(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Guest Users Table
export const guestUser = pgTable('guest_users', {
	id: varchar('id', { length: 255 }).primaryKey(),
	deviceId: text('device_id').notNull(),
	locationId: varchar('location_id', { length: 255 }).references(
		() => location.id,
	),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
