import { Metadata } from 'next';
import InvoicesTable from '@/components/dashboard/invoices-table';

export const metadata: Metadata = {
  title: 'Invoices',
};

export default async function InvoicesPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold md:text-2xl">Invoices</h1>

      <InvoicesTable />
    </div>
  );
}
