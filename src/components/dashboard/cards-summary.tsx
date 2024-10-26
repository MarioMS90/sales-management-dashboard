import { CurrencyEuroIcon, UserIcon } from '@heroicons/react/24/outline';
import { fetchInvoices, fetchSellersWithTotalSales } from '@/lib/data';
import { calculateTotal } from '@/lib/utils';
import { Invoice, InvoiceStatus } from '@/types/db-types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Price from './price';

export default async function CardsSummary() {
  const invoices = await fetchInvoices([
    { lhs: 'invoices.status', op: '=', rhs: InvoiceStatus.Paid },
  ]);
  const sellers = await fetchSellersWithTotalSales();
  const { name: topSellerName } = sellers[0];

  const totalSales = calculateTotal(invoices, 'amount');

  const lastYear = new Date().getFullYear() - 1;
  const totalSalesLastYear = calculateTotal<Invoice>(
    invoices.filter(invoice => invoice.createdAt.getFullYear() === lastYear),
    'amount',
  );

  const lastMonth = new Date().getMonth();
  const totalSalesLastMonth = calculateTotal<Invoice>(
    invoices.filter(invoice => invoice.createdAt.getMonth() === lastMonth),
    'amount',
  );

  return (
    <>
      <Card className="col-span-2 lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          <CurrencyEuroIcon className="size-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <Price amount={totalSales} />
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-2 lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Sales - Last Year</CardTitle>
          <CurrencyEuroIcon className="size-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <Price amount={totalSalesLastYear} />
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-2 lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Sales - Last Month</CardTitle>
          <CurrencyEuroIcon className="size-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <Price amount={totalSalesLastMonth} />
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-2 lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Salesperson</CardTitle>
          <UserIcon className="size-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{topSellerName}</div>
        </CardContent>
      </Card>
    </>
  );
}
