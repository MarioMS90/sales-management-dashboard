import { faker } from '@faker-js/faker';
import { twMerge } from 'tailwind-merge';
import { Invoice, InvoiceStatus, InvoicePaymentMethod, Seller } from '@/types/db-types';
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateToString(date: Date) {
  return date.toISOString().split('T')[0];
}

export function calculateTotal<T extends Record<string, unknown>>(
  elements: T[],
  key: keyof T & (string | number),
): number {
  return +elements.reduce((total, element) => total + (+element[key] || 0), 0).toFixed(2);
}

export function generateSellers(amount: number): Seller[] {
  return Array.from({ length: amount }, (_, index) => ({
    id: (1000 + index).toString(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: `/avatars/0${faker.number.int({ min: 1, max: 5 })}.png`,
  }));
}

export function generateInvoices(amount: number, sellers: Seller[]): Invoice[] {
  const sellerIds = sellers.map(seller => seller.id);

  const invoices = Array.from({ length: amount }, () => ({
    status: faker.helpers.arrayElement(Object.values(InvoiceStatus)),
    amount: +faker.finance.amount({ min: 1, max: 50, dec: 2 }),
    paymentMethod: faker.helpers.arrayElement(Object.values(InvoicePaymentMethod)),
    sellerId: faker.helpers.arrayElement(sellerIds),
    createdAt: faker.date.between({
      from: new Date(2023, 0, 1),
      to: new Date(2024, 9, 31, 23, 59, 59),
    }),
  }));

  return invoices.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}
