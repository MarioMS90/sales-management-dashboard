import { render, screen, fireEvent } from '@testing-library/react';
import { useActionState } from 'react';
import SignUpForm from '@/components/auth/sign-up-form';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useActionState: jest.fn(),
}));

jest.mock('@/lib/auth-actions', () => ({
  signUpAction: jest.fn(),
}));

const mockedUseActionState = useActionState as jest.Mock;

describe('SignUpForm', () => {
  it('renders name, email, and password inputs', () => {
    mockedUseActionState.mockImplementation(() => [{ message: null }, 'action', false]);
    render(<SignUpForm />);

    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
  });

  it('displays error messages when errors are present', () => {
    const mockErrors = { email: ['Email is required'], password: ['Password is too short'] };
    mockedUseActionState.mockReturnValue([
      { message: 'error', errors: mockErrors },
      'action',
      false,
    ]);

    render(<SignUpForm />);

    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Password is too short')).toBeInTheDocument();
  });

  it('disables submit button when isPending is true', () => {
    mockedUseActionState.mockReturnValue([{ message: null }, 'action', true]);

    render(<SignUpForm />);

    const submitButton = screen.getByRole('button', { name: /sign up/i });
    expect(submitButton).toBeDisabled();
  });

  it('generates a random user and fills the form', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ name: 'Pikachu' }),
    });

    render(<SignUpForm />);

    fireEvent.click(screen.getByRole('button', { name: /generate random user/i }));

    expect(await screen.findByDisplayValue('Pikachu')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Pikachu@gmail.com')).toBeInTheDocument();
  });
});
