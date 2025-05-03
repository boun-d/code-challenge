import { ContextFunction } from '@apollo/server';
import { Request } from 'express';
import { AccountsDataSource } from './datasources/accounts.datasource';
import { ChargesDataSource } from './datasources/charges.datasource';
import { GraphqlContext } from './types';


export const context: ContextFunction<[{ req: Request }], GraphqlContext> = async ({ req }) => {
  const token = 'dummy-token'; // Implement proper token fetching/generation
  const baseURL = process.env.BASE_URL;

  return {
    dataSources: {
      accountsDataSource: new AccountsDataSource(baseURL!, token),
      chargesDataSource: new ChargesDataSource(baseURL!, token)
    }
  };
};
