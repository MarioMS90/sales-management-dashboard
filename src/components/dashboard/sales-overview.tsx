import { fetchSalesByMonth } from '@/lib/data';
import SalesChart from './sales-chart';

export default async function SalesOverview() {
  const lastYear = new Date().getFullYear() - 1;
  const salesByMonth = await fetchSalesByMonth([
    { lhs: 'invoices.createdAt', op: '>=', rhs: new Date(lastYear, 0, 1) },
    { lhs: 'invoices.createdAt', op: '<=', rhs: new Date(lastYear, 11, 31, 23, 59, 59) },
  ]);

  return <SalesChart sales={salesByMonth} />;
}
