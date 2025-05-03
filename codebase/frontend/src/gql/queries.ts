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