import type { Config } from 'drizzle-kit';
import { dbConfig } from './src/db/config';

export default {
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: dbConfig,
} satisfies Config; 