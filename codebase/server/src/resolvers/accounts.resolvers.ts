import { GraphqlContext } from '../types';

export const accountsResolvers = {
  Query: {
    getAccounts: async (_: any, __: any, { dataSources }: GraphqlContext) => {
      return dataSources.accountsDataSource.getAccounts();
    },
    getAccount: async (_: any, { id }: { id: string }, { dataSources }: GraphqlContext) => {
      return dataSources.accountsDataSource.getAccount(id);
    }
  }
}; 