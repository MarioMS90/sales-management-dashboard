import { Metadata } from 'next';
import SalesOverview from '@/components/dashboard/sales-overview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SellersOverview from '@/components/dashboard/sellers-overview';
import CardsSummary from '@/components/dashboard/cards-summary';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold md:text-2xl">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <CardsSummary />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Sales Overview - Last Year</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <SalesOverview />
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Top Sellers Overview - Last Year</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <SellersOverview />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
