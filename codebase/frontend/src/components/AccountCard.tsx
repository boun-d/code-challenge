import { useState } from "react";
import { Account } from "../types";
import { PaymentModal } from "./PaymentModal";
import { useNavigate } from "react-router-dom";

const ACCOUNT_TYPE_TO_STRING = {
  ELECTRICITY: "Electricity",
  GAS: "Gas",
};

interface AccountCardProps {
  account: Account;
}

export const AccountCard: React.FC<AccountCardProps> = ({ account }) => {
  const navigateTo = useNavigate();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Card Header */}
        <div className="bg-blue-600 text-white px-4 py-2">
          <h2 className="text-lg font-semibold">
            {ACCOUNT_TYPE_TO_STRING[account.type] ?? "Other"}
          </h2>
        </div>

        {/* Card Content */}
        <div className="p-4">
          <div className="space-y-3">
            <div className="text-sm text-gray-500">
              <b>Account ID:</b> {account.id}
            </div>

            <div className="text-gray-700">
              <p className="text-sm">{account.address}</p>
            </div>

            <div className="flex items-center pt-2 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <span className="text-gray-600">Account Balance:</span>
                <AccountBalance amount={account.balance} />
              </div>
              <div className="flex flex-grow"></div>
              <button
                className="w-32 bg-green-600 text-white py-1.5 px-3 mx-1 rounded-md hover:bg-green-700 hover:cursor-pointer transition-colors text-sm"
                onClick={() => setIsPaymentModalOpen(true)}
              >
                Make Payment
              </button>
              <button
                className="w-32 bg-gray-600 text-white py-1.5 px-3 mx-1 rounded-md hover:bg-gray-700 hover:cursor-pointer transition-colors text-sm"
                onClick={() => navigateTo(`/charge-history/${account.id}`)}
              >
                Charge History
              </button>
            </div>
          </div>
        </div>
      </div>
      {isPaymentModalOpen && (
        <PaymentModal
          account={account}
          onClose={() => setIsPaymentModalOpen(false)}
        />
      )}
    </>
  );
};

const AccountBalance: React.FC<{ amount: number }> = ({ amount }) => {
  const resolveAmountColorCSS = (amount: number) => {
    if (amount > 0) return "text-green-600";
    if (amount < 0) return "text-red-600";
    return "text-gray-600";
  };

  return (
    <span className={`font-semibold ${resolveAmountColorCSS(amount)}`}>
      ${amount.toFixed(2)}
    </span>
  );
};
