export const accountsTypeDefs = `#graphql
type Query {
    getAccounts: [Account!]!
    getAccount(id: ID!): Account
  }

  type Account {
    id: ID!
    type: String!
    address: String!
    meterNumber: String
    volume: Int
  }
`; 