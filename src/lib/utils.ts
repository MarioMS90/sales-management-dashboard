import { Invoice, InvoiceStatus, InvoicePaymentMethod, Seller } from '@/types/db-types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateToString(date: Date) {
  return date.toISOString().split('T')[0];
}

export function getInvoices(sellers: Seller[]): Invoice[] {
  const sellerIds = sellers.map(seller => seller.id);

  const invoices = Array.from({ length: 1200 }, (_, index) => ({
    status: index < 1000 ? InvoiceStatus.Paid : randomEnumValue(InvoiceStatus),
    amount: Math.floor(Math.random() * 999) + 1,
    paymentMethod: randomEnumValue(InvoicePaymentMethod),
    sellerId: sellerIds[Math.floor(Math.random() * sellerIds.length)],
    createdAt:
      index < 1000
        ? randomDate(new Date('2023-01-01T00:00:00Z'), new Date('2023-12-31T23:59:59Z'))
        : randomDate(new Date('2024-01-01T00:00:00Z'), new Date('2024-10-31T23:59:59Z')),
  }));

  return invoices.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}

function randomEnumValue<T extends { [key: string]: string }>(enumObj: T): T[keyof T] {
  const values = Object.values(enumObj) as T[keyof T][];
  return values[Math.floor(Math.random() * values.length)];
}

function randomDate(start: Date, end: Date): Date {
  const randomTimestamp =
    Math.floor(Math.random() * (end.getTime() - start.getTime() + 1)) + start.getTime();
  return new Date(randomTimestamp);
}
