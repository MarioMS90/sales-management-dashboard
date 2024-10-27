import { fetchSellersWithTotalSales } from '@/lib/data';
import Image from 'next/image';
import Price from './price';

export default async function RecentSales() {
  const lastYear = new Date().getFullYear() - 1;
  const sellers = await fetchSellersWithTotalSales({
    filters: [
      { lhs: 'invoices.createdAt', op: '>=', rhs: new Date(lastYear, 0, 1) },
      { lhs: 'invoices.createdAt', op: '<=', rhs: new Date(lastYear, 11, 31, 23, 59, 59) },
    ],
    limit: 5,
  });

  return (
    <div className="space-y-8 px-4">
      {sellers.map(({ id, name, email, avatar, totalSales }) => (
        <div key={id} className="items-center md:flex">
          <Image
            src={avatar}
            alt="Avatar"
            className="mr-8 hidden rounded-full md:block"
            width={34}
            height={34}
          />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
          <div className="ml-auto font-medium">
            <Price amount={totalSales} />
          </div>
        </div>
      ))}
    </div>
  );
}
