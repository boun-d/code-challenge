import { ContextFunction } from '@apollo/server';
import { Request } from 'express';
import { AccountsDataSource } from './datasources/accounts.datasource';
import { ChargesDataSource } from './datasources/charges.datasource';
import { GraphqlContext } from './types';


export const context: ContextFunction<[{ req: Request }], GraphqlContext> = async ({ req }) => {
  const token = 'dummy-token'; // TODO: Implement proper token generation
  const baseURL = process.env.BASE_URL;

  return {
    dataSources: {
      accountsDataSource: new AccountsDataSource(process.env.ACCOUNTS_API_URL || '', token),
      chargesDataSource: new ChargesDataSource(process.env.CHARGES_API_URL || '', token)
    }
  };
};
