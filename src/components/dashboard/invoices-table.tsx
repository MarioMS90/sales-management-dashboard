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
        {invoices.map(({ id, status, amount, paymentMethod, sellerId, createdAt }) => (
          <TableRow key={id}>
            <TableCell className="font-medium">{id}</TableCell>
            <TableCell>{status}</TableCell>
            <TableCell>{paymentMethod}</TableCell>
            <TableCell>{sellerId}</TableCell>
            <TableCell>{formatDateToString(createdAt)}</TableCell>
            <TableCell className="text-right">{`${amount}€`}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
