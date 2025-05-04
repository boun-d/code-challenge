import { useQuery } from "@apollo/client";
import { GET_ACCOUNTS } from "../gql/queries";
import { AccountCard } from "./AccountCard";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorBanner } from "./ErrorBanner";
import { useState } from "react";
import { useMemo } from "react";

export const AccountsList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ACCOUNTS);

  const [addressFilter, setAddressFilter] = useState("");


  const accounts = useMemo(() =>{
    const accounts = data?.getAccounts ?? []
    if (addressFilter) {
        return accounts.filter((account) =>
            account.address.toLowerCase().includes(addressFilter.toLowerCase())
        );
    }
    return accounts;
}, [data, addressFilter]);

if (loading) return <LoadingSpinner />;
if (error) return <ErrorBanner />;

  return (
    <>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by address..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setAddressFilter(e.target.value)}
        />
      </div>
      {accounts.map((account) => (
        <AccountCard key={account.id} account={account} />
      ))}
    </>
  );
};
