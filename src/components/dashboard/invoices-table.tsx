'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDateToString } from '@/lib/utils';
import { useRef } from 'react';
import { fetchInvoicesAction } from '@/lib/actions';
import { InvoiceWithSellerName } from '@/lib/data';
import useScrollPagination from '@/hooks/useScrollPagination';
import Price from './price';

export default function InvoicesTable({
  initialInvoices,
  limit,
}: {
  initialInvoices: InvoiceWithSellerName[];
  limit: number;
}) {
  const ref = useRef(null);
  const [invoices] = useScrollPagination<InvoiceWithSellerName>({
    fetchDataAction: fetchInvoicesAction,
    initialData: initialInvoices,
    limit,
    refToObserve: ref,
  });

  return (
    <Table className="invoices-table">
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
        {invoices.map(({ id, status, amount, paymentMethod, sellerName, createdAt }, index) => (
          <TableRow key={id} ref={index === invoices.length - 10 ? ref : null}>
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
