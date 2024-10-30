import { render, screen, waitFor } from '@testing-library/react';
import { formatDateToString } from '@/lib/utils';
import useScrollPagination from '@/hooks/useScrollPagination';
import InvoicesTable from '@/components/dashboard/invoices-table';
import { InvoicePaymentMethod, InvoiceStatus } from '@/types/db-types';

jest.mock('@/hooks/useScrollPagination');

jest.mock('@/lib/actions', () => ({
  fetchInvoicesAction: jest.fn(),
}));

const mockInvoices = [
  {
    id: '1',
    status: InvoiceStatus.Pending,
    amount: 100,
    paymentMethod: InvoicePaymentMethod.CreditCard,
    sellerId: '1',
    sellerName: 'John Doe',
    createdAt: new Date('2023-10-01'),
  },
  {
    id: '2',
    status: InvoiceStatus.Paid,
    amount: 200,
    paymentMethod: InvoicePaymentMethod.BankTransfer,
    sellerId: '2',
    sellerName: 'Jane Smith',
    createdAt: new Date('2023-10-02'),
  },
];

const mockedUseInfiniteScroll = useScrollPagination as jest.Mock;

describe('InvoicesTable', () => {
  beforeEach(() => {
    mockedUseInfiniteScroll.mockReturnValue([mockInvoices, false]);
  });

  it('renders the table headers', () => {
    render(<InvoicesTable initialInvoices={mockInvoices} limit={10} />);

    expect(screen.getByText('Invoice ID')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Payment Method')).toBeInTheDocument();
    expect(screen.getByText('Seller')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
  });

  it('renders initial invoices correctly', () => {
    render(<InvoicesTable initialInvoices={mockInvoices} limit={10} />);

    mockInvoices.forEach(invoice => {
      expect(screen.getByText(invoice.id)).toBeInTheDocument();
      expect(screen.getByText(invoice.status)).toBeInTheDocument();
      expect(screen.getByText(invoice.paymentMethod)).toBeInTheDocument();
      expect(screen.getByText(invoice.sellerName)).toBeInTheDocument();
      expect(screen.getByText(formatDateToString(invoice.createdAt))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(`${invoice.amount}`, 'i'))).toBeInTheDocument();
    });
  });

  it('render additional invoices returned by useInfiniteScroll', async () => {
    const additionalInvoices = [
      {
        id: '3',
        status: InvoiceStatus.Paid,
        amount: 300,
        paymentMethod: InvoicePaymentMethod.CreditCard,
        sellerId: '3',
        sellerName: 'Alice Johnson',
        createdAt: new Date('2023-10-03'),
      },
    ];

    mockedUseInfiniteScroll.mockReturnValue([additionalInvoices, false]);

    render(<InvoicesTable initialInvoices={mockInvoices} limit={10} />);

    await waitFor(() => {
      expect(screen.getByText(additionalInvoices[0].id)).toBeInTheDocument();
      expect(screen.getByText(additionalInvoices[0].status)).toBeInTheDocument();
      expect(screen.getByText(additionalInvoices[0].paymentMethod)).toBeInTheDocument();
      expect(screen.getByText(additionalInvoices[0].sellerName)).toBeInTheDocument();
      expect(
        screen.getByText(formatDateToString(additionalInvoices[0].createdAt)),
      ).toBeInTheDocument();
      expect(
        screen.getByText(new RegExp(`${additionalInvoices[0].amount}`, 'i')),
      ).toBeInTheDocument();
    });
  });
});
