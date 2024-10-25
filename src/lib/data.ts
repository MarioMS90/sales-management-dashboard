'use server';

import { Invoice, Seller } from '@/types/db-types';
import { db } from './kysely';

export async function fetchSellers(): Promise<Seller[]> {
  try {
    const sellers = await db.selectFrom('sellers').selectAll().execute();

    return sellers;
  } catch (error) {
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchInvoices(): Promise<Invoice[]> {
  try {
    const invoices = await db.selectFrom('invoices').selectAll().execute();

    return invoices;
  } catch (error) {
    throw new Error('Failed to fetch invoices.');
  }
}
