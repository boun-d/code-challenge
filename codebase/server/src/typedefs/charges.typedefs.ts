export const chargesTypeDefs = `#graphql
type Query {
    getCharges: [Charge!]!
    getCharge(id: ID!): Charge
  }

  type Charge {
    id: ID!
    accountId: String!
    amount: Float!
    date: String!
  }
`; 