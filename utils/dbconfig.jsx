// @/utils/dbConfig.js
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const sql = neon('postgresql://neondb_owner:myb4eMXwhc8S@ep-rough-sea-a52zxe7x.us-east-2.aws.neon.tech/Expense-Tracker-v3?sslmode=require');
export const db = drizzle(sql, { schema });
