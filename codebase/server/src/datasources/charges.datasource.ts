import { RESTDataSource, AugmentedRequest } from "@apollo/datasource-rest";
import { MOCK_DUE_CHARGES_API } from "./__mocks__/dueChargesAPIMock";

export type Charge = {
  id: string;
  accountId: string;
  date: string;
  amount: number;
}

export class ChargesDataSource extends RESTDataSource {
  token: string;

  constructor(baseURL: string, token: string) {
    super();
    this.baseURL = baseURL;
    this.token = token;
  }

  override willSendRequest(_path: string, request: AugmentedRequest) {
    request.headers["Authorization"] = `Bearer ${this.token}`;
  }

  async getCharges(): Promise<Charge[]> {
    return MOCK_DUE_CHARGES_API().catch((e) => {
      //handle error
      throw e;
    });
  }

  async getCharge(id: string): Promise<Charge | undefined> {
    return MOCK_DUE_CHARGES_API()
      .then((charges) => charges.find((charge) => charge.id === id))
      .then((charge) => {
        if (!charge) {
          throw new Error('Charge not found');
        }
        return charge;
      })
      .catch((e) => {
        //handle error
        throw e;
      });
  }

  async getChargesByAccountId(accountId: string): Promise<Charge[]> {
    return MOCK_DUE_CHARGES_API()
      .then((charges) => charges.filter((charge) => charge.accountId === accountId))
      .catch((e) => {
        //handle error
        throw e;
      });
  }
}
