'use server';

import { Seller } from '@/types/db-types';
import { fetchInvoices, fetchSellers, InvoiceWithSellerName } from './data';

export async function fetchInvoicesAction({
  offset,
  limit,
}: {
  offset: number;
  limit: number;
}): Promise<InvoiceWithSellerName[]> {
  try {
    const invoices = await fetchInvoices({ offset, limit });

    return invoices;
  } catch (error) {
    throw new Error(`Failed to fetch invoices. ${error}`);
  }
}

export async function fetchSellersAction({
  offset,
  limit,
}: {
  offset: number;
  limit: number;
}): Promise<Seller[]> {
  try {
    const sellers = await fetchSellers({ offset, limit });

    return sellers;
  } catch (error) {
    throw new Error(`Failed to fetch sellers. ${error}`);
  }
}
