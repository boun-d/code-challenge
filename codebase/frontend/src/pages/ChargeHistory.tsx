import { useParams } from "react-router-dom";
import { ChargeHistoryList } from "../components/ChargeHistoryList";

export const ChargeHistory = () => {
  const { accountId } = useParams();
  console.log(accountId);

  return (
    <div className="min-h-screen">
      <div className="w-full max-w-screen-sm px-4 m-10 mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Account Charge History
          </h1>
          <p className="mt-2 text-gray-600">View your account charge history</p>
        </div>
        <div className="space-y-4">
          <ChargeHistoryList accountId={accountId!} />
          <div className="mt-8 text-left">
            <button
              onClick={() => window.history.back()}
              className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors hover:cursor-pointer"
            >
              Back to Accounts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
