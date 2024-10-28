import SellersTable from '@/components/dashboard/sellers-table';
import { fetchSellers } from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sellers',
};

export default async function SellersPage() {
  const SELLERS_LIMIT_PER_QUERY = 10;

  const sellers = await fetchSellers({ limit: SELLERS_LIMIT_PER_QUERY });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold md:text-2xl">Sellers</h1>

      <SellersTable initialSellers={sellers} limit={SELLERS_LIMIT_PER_QUERY} />
    </div>
  );
}
