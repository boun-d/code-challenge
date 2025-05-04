import { gql, TypedDocumentNode } from "@apollo/client";
import { Account } from "../types";

export const GET_ACCOUNTS: TypedDocumentNode<{ getAccounts: Account[] }> = gql`
    query GetAccounts {
        getAccounts {
            id
            type
            address
            meterNumber
            volume
            balance
            charges {
                id
                accountId
                amount
                date
            }
        }
    }
`

export const GET_ACCOUNT: TypedDocumentNode<{ getAccount: Account }> = gql`
    query GetAccount($id: ID!) {
        getAccount(id: $id) {
            id
            type
            address
            meterNumber
            volume
            balance
            charges {
                id
                accountId
                amount
                date
            }
        }
    }
`