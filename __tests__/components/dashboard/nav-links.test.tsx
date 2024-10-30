import { render, screen } from '@testing-library/react';
import NavLinks from '@/components/dashboard/nav-links';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('NavLinks', () => {
  const mockPathname = usePathname as jest.Mock;

  beforeEach(() => {
    mockPathname.mockReturnValue('/dashboard');
  });

  it('renders all navigation links', () => {
    render(<NavLinks />);

    expect(screen.getByLabelText('Home')).toBeInTheDocument();
    expect(screen.getByLabelText('Invoices')).toBeInTheDocument();
    expect(screen.getByLabelText('Sellers')).toBeInTheDocument();
  });

  it('applies active class to the link matching the pathname', () => {
    mockPathname.mockReturnValue('/dashboard/invoices');
    render(<NavLinks />);

    const invoicesLink = screen.getByLabelText('Invoices');
    expect(invoicesLink.firstChild).toHaveClass(
      'bg-sidebar-accent',
      'text-sidebar-accent-foreground',
    );
  });

  it('applies hover styles correctly', () => {
    render(<NavLinks />);
    const links = screen.getAllByRole('link');

    links.forEach(link => {
      expect(link.firstChild).toHaveClass(
        'hover:bg-sidebar-accent',
        'hover:text-sidebar-accent-foreground',
      );
    });
  });

  it('renders the correct icons for each link', () => {
    render(<NavLinks />);

    expect(screen.getByLabelText('Home').querySelector('svg')).toBeInTheDocument();
    expect(screen.getByLabelText('Invoices').querySelector('svg')).toBeInTheDocument();
    expect(screen.getByLabelText('Sellers').querySelector('svg')).toBeInTheDocument();
  });

  it('displays link text only on larger screens', () => {
    render(<NavLinks />);
    const homeText = screen.getByText('Home');
    const invoicesText = screen.getByText('Invoices');
    const sellersText = screen.getByText('Sellers');

    expect(homeText).toHaveClass('hidden md:block');
    expect(invoicesText).toHaveClass('hidden md:block');
    expect(sellersText).toHaveClass('hidden md:block');
  });
});
