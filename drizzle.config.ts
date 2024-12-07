import { config } from '@config/app.config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	out: './server/migrations',
	schema: './server/models/index.ts',
	dialect: 'postgresql',
	dbCredentials: {
		url: config.db.url,
	},
});
