import { render, screen, waitFor } from '@testing-library/react';
import useScrollPagination from '@/hooks/useScrollPagination';
import SellersTable from '@/components/dashboard/sellers-table';

jest.mock('@/hooks/useScrollPagination');

jest.mock('@/lib/actions', () => ({
  fetchSellersAction: jest.fn(),
}));

const mockSellers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/john.png',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: '/jane.png',
  },
];

const mockedUseInfiniteScroll = useScrollPagination as jest.Mock;

describe('SellersTable', () => {
  beforeEach(() => {
    mockedUseInfiniteScroll.mockReturnValue([mockSellers, false]);
  });

  it('renders the table headers', () => {
    render(<SellersTable initialSellers={mockSellers} limit={10} />);

    expect(screen.getByText('Seller ID')).toBeInTheDocument();
    expect(screen.getByText('Avatar')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders initial sellers correctly', () => {
    render(<SellersTable initialSellers={mockSellers} limit={10} />);

    mockSellers.forEach((seller, index) => {
      expect(screen.getByText(seller.id)).toBeInTheDocument();
      expect(screen.getByText(seller.name)).toBeInTheDocument();
      expect(screen.getByText(seller.email)).toBeInTheDocument();
      expect(screen.getByAltText(`Avatar of ${seller.name}`).getAttribute('src')).toContain(
        encodeURIComponent(seller.avatar),
      );
    });
  });

  it('renders additional sellers returned by useInfiniteScroll', async () => {
    const additionalSellers = [
      {
        id: '3',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        avatar: '/alice.png',
      },
    ];

    mockedUseInfiniteScroll.mockReturnValue([additionalSellers, false]);

    render(<SellersTable initialSellers={mockSellers} limit={10} />);

    await waitFor(() => {
      expect(screen.getByText(additionalSellers[0].id)).toBeInTheDocument();
      expect(screen.getByText(additionalSellers[0].name)).toBeInTheDocument();
      expect(screen.getByText(additionalSellers[0].email)).toBeInTheDocument();
      expect(
        screen.getByAltText(`Avatar of ${additionalSellers[0].name}`).getAttribute('src'),
      ).toContain(encodeURIComponent(additionalSellers[0].avatar));
    });
  });
});
