import { useState } from "react";
import { Modal } from "./Modal";
import { Account } from "../types";
import { MAKE_PAYMENT } from "../gql/mutations";
import { useMutation } from "@apollo/client";
interface PaymentModalProps {
  account: Account;
  onClose: () => void;
}   

export const PaymentModal: React.FC<PaymentModalProps> = ({
  account,
  onClose,
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");

  const [wasSuccessful, setWasSuccessful] = useState<boolean>(false);

  const [makePayment, { loading, error }] = useMutation(MAKE_PAYMENT, { onCompleted: () => setWasSuccessful(true)});

  const onSubmit = (amount: number, cardNumber: string, expiryDate: string, cvv: string) => {
    // TODO Validate inputs
    // TODO Verify payment details

    console.log('Verifying payment details: ', amount, cardNumber, expiryDate, cvv);
    makePayment({ variables: { accountId: account.id, amount } });
  }

  
  if (loading) return <Modal title="Processing Payment">Please wait while we process your payment...</Modal>
  if (error) return <Modal title="Error" onClose={onClose}>An error occurred while processing your payment. Please try again.</Modal>
  if (wasSuccessful) return <Modal title="Payment Successful" onClose={onClose}>Your payment has been processed successfully.</Modal>
  
  return (
    <Modal onClose={onClose} title="Make a Payment">
      <form
        onSubmit={() => onSubmit(amount, cardNumber, expiryDate, cvv)}
        className="space-y-6"
      >
        <div className="text-center mb-6">
          <p className="text-gray-600">
            {account.type} - {account.address}
          </p>
          <p className="text-lg font-semibold mt-2">
            Balance: ${account.balance.toFixed(2)}
          </p>
        </div>
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="0.00"
          />
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
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
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
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
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
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
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
    </Modal>
  );
};
