import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../test-utils';
import { AccountCard } from './AccountCard';
import { Account } from '../types';
import { act } from 'react';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useMutation: jest.fn(() => [jest.fn(), { loading: false, error: null }])
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate
}));

const mockUseNavigate = jest.fn();

const stubAccount = () => (
  {
    id: '1',
    type: 'ELECTRICITY',
    address: '123 Test St',
    meterNumber: '12345',
    volume: 100,
    balance: 50.00,
    charges: []
  } as Account
);

describe('AccountCard', () => {
  const user = userEvent.setup();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render AccountCard successfully', async () => {
    const account = stubAccount();
    renderWithProviders(<AccountCard account={account} />);

    expect(screen.getByText('123 Test St')).toBeInTheDocument();
    expect(screen.getByText('$50.00')).toBeInTheDocument();

    expect(screen.getByTestId('make-payment-button')).toBeInTheDocument();
    expect(screen.getByTestId('charge-history-button')).toBeInTheDocument();

    expect(screen.queryByTestId('payment-modal')).not.toBeInTheDocument();
  });

  it('should open the payment modal when make payment button is clicked', async () => {
    const account = stubAccount();
    renderWithProviders(<AccountCard account={account} />);

    const makePaymentButton = screen.getByTestId('make-payment-button');

    await act(async () => {
      await user.click(makePaymentButton);
    });

    expect(screen.getByTestId('payment-modal')).toBeInTheDocument();
  }); 

  it('should close the payment modal when the close button is clicked', async () => {
    const account = stubAccount();
    renderWithProviders(<AccountCard account={account} />);

    const makePaymentButton = screen.getByTestId('make-payment-button');

    await act(async () => {
      await user.click(makePaymentButton);
    });

    expect(screen.getByTestId('payment-modal')).toBeInTheDocument();

    const closeButton = screen.getByTestId('close-button');

    await act(async () => {
      await user.click(closeButton);
    });

    expect(screen.queryByTestId('payment-modal')).not.toBeInTheDocument();
  });

  it('should navigate to the charge history page when the charge history button is clicked', async () => {
    const account = stubAccount();
    renderWithProviders(<AccountCard account={account} />);

    const chargeHistoryButton = screen.getByTestId('charge-history-button');
    
    await act(async () => {
      await user.click(chargeHistoryButton);
    });

    expect(mockUseNavigate).toHaveBeenCalledWith('/charge-history/1');
  });
}); 