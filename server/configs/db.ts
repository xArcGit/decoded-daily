import { config } from '@config/app.config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';

const sql = neon(config.db.url);
export const db = drizzle({ client: sql });
