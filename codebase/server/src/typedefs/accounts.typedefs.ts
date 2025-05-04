export const accountsTypeDefs = `#graphql
type Query {
    getAccounts: [Account!]!
    getAccount(id: ID!): Account
  }

  type Mutation {
    makePayment(accountId: ID!, amount: Float!): Account
  }

  type Account {
    id: ID!
    type: AccountType!
    address: String!
    meterNumber: String
    volume: Int
    balance: Float!
    charges: [Charge!]!
  }

  enum AccountType {
    ELECTRICITY
    GAS
  }
`; 