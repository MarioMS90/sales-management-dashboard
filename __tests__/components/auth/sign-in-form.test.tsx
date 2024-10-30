import { render, screen, fireEvent } from '@testing-library/react';
import { useActionState } from 'react';
import SignInForm from '@/components/auth/sign-in-form';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useActionState: jest.fn(),
}));

jest.mock('@/lib/auth-actions', () => ({
  signInAction: jest.fn(),
}));

const mockedUseActionState = useActionState as jest.Mock;

describe('SignInForm', () => {
  it('renders email and password inputs', () => {
    mockedUseActionState.mockImplementation(() => [null, 'action', false]);
    render(<SignInForm />);

    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
  });

  it('displays error message when errorMessage is present', () => {
    mockedUseActionState.mockReturnValue(['Invalid credentials', 'action', false]);

    render(<SignInForm />);

    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    expect(screen.getByText('Invalid credentials')).toHaveClass('text-red-500');
  });

  it('disables submit button when isPending is true', () => {
    mockedUseActionState.mockReturnValue([null, 'action', true]);

    render(<SignInForm />);

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    expect(submitButton).toBeDisabled();
  });
});
