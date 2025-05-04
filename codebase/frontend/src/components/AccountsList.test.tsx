import { screen } from '@testing-library/react';
import { renderWithProviders } from '../test-utils';
import { AccountsList } from './AccountsList';
import { useQuery } from '@apollo/client';

//TODO I prefer to create custom useQuery hooks for queries so they are easier to mock in test
//Eg. useAccountsQuery

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn()
}));

const mockUseQuery = useQuery as jest.Mock;

const stubAccounts = () => [
  {
    id: '1',
    type: 'ELECTRICITY',
    address: '123 Test St',
    meterNumber: '12345',
    volume: 100,
    balance: 50.00,
    charges: []
  }
];

describe('AccountsList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders accounts successfully', async () => {
    const accounts = stubAccounts();
    mockUseQuery.mockReturnValue({
      loading: false,
      error: null,
      data: { getAccounts: accounts }
    });

    renderWithProviders(<AccountsList />);
    
    expect(await screen.findByText('123 Test St')).toBeInTheDocument();
    expect(screen.getByText('Electricity')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    mockUseQuery.mockReturnValue({
      loading: true,
      error: null,
      data: null
    });

    renderWithProviders(<AccountsList />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('shows error state', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: new Error('Test error'),
      data: null
    });

    renderWithProviders(<AccountsList />);
    expect(screen.getByTestId('error-banner')).toBeInTheDocument();
  });
}); 