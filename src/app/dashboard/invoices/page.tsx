import { Metadata } from 'next';
import InvoicesTable from '@/components/dashboard/invoices-table';
import { fetchInvoices } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Invoices',
};

export default async function InvoicesPage() {
  const INVOICES_LIMIT = 10;

  const invoices = await fetchInvoices({ limit: INVOICES_LIMIT });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold md:text-2xl">Invoices</h1>

      <InvoicesTable initialInvoices={invoices} limit={INVOICES_LIMIT} />
    </div>
  );
}
