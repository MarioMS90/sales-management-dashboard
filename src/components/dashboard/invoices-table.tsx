import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const invoices = [
  {
    id: 'INV001',
    status: 'paid',
    amount: 250.0,
    paymentMethod: 'Credit Card',
  },
  {
    id: 'INV002',
    status: 'pending',
    amount: 150.0,
    paymentMethod: 'PayPal',
  },
  {
    id: 'INV003',
    status: 'pending',
    amount: 350.0,
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 'INV004',
    status: 'paid',
    amount: 450.0,
    paymentMethod: 'Credit Card',
  },
  {
    id: 'INV005',
    status: 'paid',
    amount: 550.0,
    paymentMethod: 'PayPal',
  },
  {
    id: 'INV006',
    status: 'pending',
    amount: 200.0,
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 'INV007',
    status: 'pending',
    amount: 300.0,
    paymentMethod: 'Credit Card',
  },
];

export default function InvoicesTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Payment Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map(({ id, status, amount, paymentMethod }) => (
          <TableRow key={id}>
            <TableCell className="font-medium">{id}</TableCell>
            <TableCell>{status}</TableCell>
            <TableCell>{paymentMethod}</TableCell>
            <TableCell className="text-right">{`${amount}€`}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
