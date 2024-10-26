import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { fetchInvoices } from '@/lib/data';
import { formatDateToString } from '@/lib/utils';
import Price from './price';

export default async function InvoicesTable() {
  const invoices = await fetchInvoices();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice ID</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Payment Method</TableHead>
          <TableHead>Seller</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map(({ id, status, amount, paymentMethod, sellerName, createdAt }) => (
          <TableRow key={id}>
            <TableCell className="font-medium">{id}</TableCell>
            <TableCell>{status}</TableCell>
            <TableCell>{paymentMethod}</TableCell>
            <TableCell>{sellerName}</TableCell>
            <TableCell>{formatDateToString(createdAt)}</TableCell>
            <TableCell className="text-right">
              <Price amount={amount} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
