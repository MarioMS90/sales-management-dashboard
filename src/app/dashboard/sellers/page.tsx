import SellersTable from '@/components/dashboard/sellers-table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sellers',
};

export default async function SellersPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold md:text-2xl">Sellers</h1>

      <SellersTable />
    </div>
  );
}
