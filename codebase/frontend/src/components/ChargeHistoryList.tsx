import { useQuery } from "@apollo/client";
import { ErrorBanner } from "./ErrorBanner";
import { LoadingSpinner } from "./LoadingSpinner";
import { GET_ACCOUNT } from "../gql/queries";

interface ChargeHistoryListProps {
  accountId: string;
}

export const ChargeHistoryList: React.FC<ChargeHistoryListProps> = ({
  accountId,
}) => {
  const { data, loading, error } = useQuery(GET_ACCOUNT, {
    variables: { id: accountId },
  });

  if (loading) return <LoadingSpinner message="Loading charge history..." />;
  if (error) return <ErrorBanner />;

  const charges = data?.getAccount.charges ?? [];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-blue-600 text-white px-4 py-2">
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium uppercase tracking-wider">
              Charge ID
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium uppercase tracking-wider">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {charges.length ? (
            <>
              {charges.map((charge) => (
                <tr key={charge.id}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {charge.id}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    ${charge.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {new Date(charge.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <td className="text-gray-500 px-6 py-4">No charges found</td>
          )}
        </tbody>
      </table>
    </div>
  );
};
