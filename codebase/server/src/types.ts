import { AccountsDataSource } from "./datasources/accounts.datasource";
import { ChargesDataSource } from "./datasources/charges.datasource";

export interface GraphqlContext {
  dataSources: DataSources;
}

export interface DataSources {
  accountsDataSource: AccountsDataSource;
  chargesDataSource: ChargesDataSource;
}
