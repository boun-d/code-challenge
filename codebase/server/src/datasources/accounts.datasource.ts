import { RESTDataSource, AugmentedRequest } from '@apollo/datasource-rest';
import { MOCK_ENERGY_ACCOUNTS_API } from './__mocks__/energyAccountsAPIMock';

export interface Account {
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
      //handle error
      throw e;
    });
  }

  async getAccount(id: string): Promise<Account | undefined> {
    return MOCK_ENERGY_ACCOUNTS_API()
      .then((accounts) => accounts.find((account) => account.id === id))
      .catch((e) => {
        //handle error
        throw e;
      });
  }
} 