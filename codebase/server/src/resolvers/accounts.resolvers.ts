import { GraphqlContext } from '../types';

export const accountsResolvers = {
  Query: {
    getAccounts: async (_: any, __: any, { dataSources }: GraphqlContext) => {
      return dataSources.accountsDataSource.getAccounts();
    },
    getAccount: async (_: any, { id }: { id: string }, { dataSources }: GraphqlContext) => {
      return dataSources.accountsDataSource.getAccount(id);
    },
  },
  Mutation: {
    makePayment: async (_: any, { accountId, amount }: { accountId: string, amount: number }, { dataSources }: GraphqlContext) => {
      const charge = {
        id: '1',
        accountId,
        amount: amount,
        date: new Date().toISOString().split('T')[0]
      }
      return dataSources.accountsDataSource.makePayment(accountId, charge);
    }
  },
  Account: {
    balance: async ({ id }: { id: string }, _: any, { dataSources }: GraphqlContext) => {
      const charges = await dataSources.chargesDataSource.getChargesByAccountId(id);
      return charges.reduce((acc, charge) => acc + charge.amount, 0);
    },
    charges: async ({ id }: { id: string }, _: any, { dataSources }: GraphqlContext) => {
      return dataSources.chargesDataSource.getChargesByAccountId(id);
    }
  }
}; 