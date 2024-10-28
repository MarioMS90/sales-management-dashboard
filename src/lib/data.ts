'use server';

import { Database, Invoice, InvoiceStatus, Seller } from '@/types/db-types';
import {
  ComparisonOperatorExpression,
  OperandValueExpressionOrList,
  ReferenceExpression,
  sql,
} from 'kysely';
import { db } from './kysely';

type QueryFilter<DB, TB extends keyof DB> = {
  lhs: ReferenceExpression<DB, TB>;
  op: ComparisonOperatorExpression;
  rhs: OperandValueExpressionOrList<DB, TB, ReferenceExpression<DB, TB>>;
};

export async function fetchSellers({
  offset,
  limit,
}: {
  offset?: number;
  limit?: number;
} = {}): Promise<Seller[]> {
  try {
    let query = db.selectFrom('sellers').selectAll();

    if (limit) {
      query = query.limit(limit);
    }

    if (offset) {
      query = query.offset(offset);
    }

    return await query.execute();
  } catch (error) {
    throw new Error(`Failed to fetch sellers. ${error}`);
  }
}

export type InvoiceWithSellerName = Invoice & { sellerName: string };
export async function fetchInvoices({
  filters = [],
  offset,
  limit,
}: {
  filters?: QueryFilter<Database, 'invoices' | 'sellers'>[];
  offset?: number;
  limit?: number;
} = {}): Promise<InvoiceWithSellerName[]> {
  try {
    let query = db
      .selectFrom('invoices')
      .leftJoin('sellers', 'invoices.sellerId', 'sellers.id')
      .selectAll('invoices')
      .select('sellers.name as sellerName');

    if (limit) {
      query = query.limit(limit);
    }

    if (offset) {
      query = query.offset(offset);
    }

    filters.forEach(({ lhs, op, rhs }) => {
      query = query.where(lhs, op, rhs);
    });

    return await query.execute();
  } catch (error) {
    throw new Error(`Failed to fetch invoices. ${error}`);
  }
}

export type SellerWithTotal = Seller & { totalSales: number };
export async function fetchSellersWithTotalSales({
  filters = [],
  limit,
}: {
  filters?: QueryFilter<Database, 'sellers' | 'invoices'>[];
  limit?: number;
} = {}): Promise<SellerWithTotal[]> {
  try {
    let query = db
      .selectFrom('sellers')
      .leftJoin('invoices', 'sellers.id', 'invoices.sellerId')
      .selectAll('sellers')
      .select(({ fn }) => fn.sum<number>('invoices.amount').as('totalSales'))
      .where('invoices.status', '=', InvoiceStatus.Paid)
      .groupBy('sellers.id')
      .orderBy('totalSales', 'desc');

    filters.forEach(({ lhs, op, rhs }) => {
      query = query.where(lhs, op, rhs);
    });

    if (limit) {
      query = query.limit(limit);
    }

    return await query.execute();
  } catch (error) {
    throw new Error(`Failed to fetch sellers with total sales. ${error}`);
  }
}

export type TotalSalesByMonth = { month: string; total: number };
export async function fetchSalesByMonth({
  filters = [],
}: {
  filters?: QueryFilter<Database, 'invoices'>[];
} = {}): Promise<TotalSalesByMonth[]> {
  try {
    let query = db
      .selectFrom('invoices')
      .select(({ fn }) => fn.sum<number>('invoices.amount').as('total'))
      .select(({ fn, ref }) =>
        fn<Date>('date_trunc', [sql.lit('MONTH'), ref('createdAt')]).as('month'),
      )
      .where('status', '=', InvoiceStatus.Paid)
      .groupBy('month')
      .orderBy('month');

    filters.forEach(({ lhs, op, rhs }) => {
      query = query.where(lhs, op, rhs);
    });

    const salesByMonth = await query.execute();

    return salesByMonth.map(({ month, total }) => ({
      month: month.toLocaleString('en-US', { month: 'short' }),
      total,
    }));
  } catch (error) {
    throw new Error(`Failed to fetch total sales by month. ${error}`);
  }
}
