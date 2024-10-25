import { Database } from '@/types/db-types';
import { createKysely } from '@vercel/postgres-kysely';

export const db = createKysely<Database>();
