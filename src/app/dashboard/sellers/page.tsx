import SellersTable from '@/components/dashboard/sellers-table';
import { fetchSellers } from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sellers',
};

export default async function SellersPage() {
  const INVOICES_LIMIT = 10;
  const sellers = await fetchSellers({ limit: INVOICES_LIMIT });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold md:text-2xl">Sellers</h1>

      <SellersTable initialSellers={sellers} limit={INVOICES_LIMIT} />
    </div>
  );
}
