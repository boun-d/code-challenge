import { RESTDataSource, AugmentedRequest } from '@apollo/datasource-rest';
import { MOCK_ENERGY_ACCOUNTS_API } from './__mocks__/energyAccountsAPIMock';
import { Charge } from './charges.datasource';

export type Account = {
  id: string;
  type: string;
  address: string;
  meterNumber?: string;
  volume?: number;
}

export class AccountsDataSource extends RESTDataSource {
  token: string;

  constructor(baseURL: string, token: string) {
    super();
    this.baseURL = baseURL;
    this.token = token;
  }

  override willSendRequest(_path: string, request: AugmentedRequest) {
    request.headers['Authorization'] = `Bearer ${this.token}`;
  }

  async getAccounts(): Promise<Account[]> {
    return MOCK_ENERGY_ACCOUNTS_API().catch((e) => {
      // TODO handle error
      throw e;
    });
  }

  async getAccount(id: string): Promise<Account> {
    return MOCK_ENERGY_ACCOUNTS_API()
      .then((accounts) => accounts.find((account) => account.id === id))
      .then((account) => {
        if (!account) {
          throw new Error('Account not found');
        }
        return account;
      })
      .catch((e) => {
        // TODO handle error
        throw e;
      });
  }

  async makePayment(accountId: string, charge: Charge): Promise<Account> {
    // TODO Verify payment was made on client side
    if (false) {
      throw new Error('Payment failed');
      
    }

    // TODO Add charge to account

    // Simulate payment processing time
    await new Promise(resolve => setTimeout(() => {
      resolve(true);
    }, 1000));

    return await this.getAccount(accountId);
  }
} 