import { Database } from '@/types/app-types';
import { createKysely } from '@vercel/postgres-kysely';

export const db = createKysely<Database>();
