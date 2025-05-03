import { useQuery } from "@apollo/client";
import { GET_ACCOUNTS } from "../gql/queries";
import { AccountCard } from "../components/AccountCard";
import { Modal } from "../components/Modal";
import { Account } from "../types";
import { useState } from "react";
import { Loading } from "../components/LoadingSpinner";
import { ErrorBanner } from "../components/ErrorBanner";

export const Accounts: React.FC = () => {
  const { loading, error, data } = useQuery<{ getAccounts: Account[] }>(
    GET_ACCOUNTS
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const makePayment = (accountId: string) => {
    const account = data?.getAccounts.find((acc) => acc.id === accountId);
    setSelectedAccount(account ?? null);
    setIsModalOpen(true);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Payment details:", paymentForm);
    // Handle payment submission here
    setIsModalOpen(false);
    setSelectedAccount(null);
    setPaymentForm({ cardNumber: "", expiryDate: "", cvv: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) return <Loading />;
  if (error) return <ErrorBanner />;

  const accounts = data?.getAccounts ?? [];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-screen-sm px-4 m-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Accounts</h1>
          <p className="mt-2 text-gray-600">Manage your accounts</p>
        </div>
        {/* Accounts List */}
        <div className="space-y-4">
          {accounts.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
              makePayment={makePayment}
            />
          ))}
        </div>
      </div>

      {isModalOpen && (
        <Modal
          onClose={() => {
            setIsModalOpen(false);
            setSelectedAccount(null);
            setPaymentForm({ cardNumber: "", expiryDate: "", cvv: "" });
          }}
          title="Make a Payment"
        >
          {selectedAccount && (
            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <p className="text-gray-600">
                  {selectedAccount.type} - {selectedAccount.address}
                </p>
                <p className="text-lg font-semibold mt-2">
                  Balance: ${selectedAccount.balance.toFixed(2)}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="card-number"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="card-number"
                    name="card-number"
                    value={paymentForm.cardNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>

                <div>
                  <label
                    htmlFor="bsb"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiry-date"
                    name="expiry-date"
                    value={paymentForm.expiryDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="08/08"
                  />
                </div>

                <div>
                  <label
                    htmlFor="csv"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    CSV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={paymentForm.cvv}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="123"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
              >
                Submit Payment
              </button>
            </form>
          )}
        </Modal>
      )}
    </div>
  );
}
