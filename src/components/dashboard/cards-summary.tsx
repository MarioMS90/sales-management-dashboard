import { CurrencyEuroIcon, UserIcon } from '@heroicons/react/24/outline';
import { fetchInvoices, fetchSellersWithTotalSales } from '@/lib/data';
import { calculateTotal } from '@/lib/utils';
import { Invoice, InvoiceStatus } from '@/types/db-types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Price from './price';

export default async function CardsSummary() {
  const invoices = await fetchInvoices({
    filters: [{ lhs: 'invoices.status', op: '=', rhs: InvoiceStatus.Paid }],
  });
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

  const cards = [
    {
      title: 'Total Sales',
      icon: <CurrencyEuroIcon className="size-5 text-muted-foreground" />,
      content: <Price amount={totalSales} />,
    },
    {
      title: 'Total Sales - Last Year',
      icon: <CurrencyEuroIcon className="size-5 text-muted-foreground" />,
      content: <Price amount={totalSalesLastYear} />,
    },
    {
      title: 'Total Sales - Last Month',
      icon: <CurrencyEuroIcon className="size-5 text-muted-foreground" />,
      content: <Price amount={totalSalesLastMonth} />,
    },
    {
      title: 'Top Salesperson',
      icon: <UserIcon className="size-5 text-muted-foreground" />,
      content: topSellerName,
    },
  ];

  return (
    <>
      {cards.map(card => (
        <Card key={card.title} className="card col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            {card.icon}
          </CardHeader>
          <CardContent>
            <div className="card-content text-2xl font-bold">{card.content}</div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
