import { useQuery } from "@apollo/client";
import { GET_ACCOUNTS } from "../gql/queries";
import { AccountCard } from "./AccountCard";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorBanner } from "./ErrorBanner";
import { useState } from "react";
import { useMemo } from "react";

export const AccountsList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ACCOUNTS);

  const [typeFilter, setTypeFilter] = useState<"ELECTRICITY" | "GAS" | undefined>();

  const accounts = useMemo(() =>{
    const accounts = data?.getAccounts ?? []
    if (typeFilter) {
        return accounts.filter((account) =>
            account.type === typeFilter
        );
    }
    return accounts;
}, [data, typeFilter]);

if (loading) return <LoadingSpinner />;
if (error) return <ErrorBanner />;

  return (
    <>
      <div className="mb-4">
        <select
          className="p-2 border rounded"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as "ELECTRICITY" | "GAS" | undefined)}
          data-testid="account-type-filter"
        >
          <option value={undefined}>All Types</option>
          <option value="ELECTRICITY">Electricity</option>
          <option value="GAS">Gas</option>
        </select>
      </div>
      {accounts.map((account) => (
        <AccountCard key={account.id} account={account} />
      ))}
    </>
  );
};
