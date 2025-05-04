import { gql } from "@apollo/client";

export const MAKE_PAYMENT = gql`
  mutation MakePayment($accountId: ID!, $amount: Float!) {
    makePayment(accountId: $accountId, amount: $amount) {
      id
      balance
    }
  }
`;