import { AccountsList } from "../components/AccountsList";

export const Accounts: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="w-full max-w-screen-sm px-4 m-10 mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Accounts</h1>
          <p className="mt-2 text-gray-600">Manage your accounts</p>
        </div>
        {/* Accounts List */}
        <div className="space-y-4">
          <AccountsList />
        </div>
      </div>
    </div>
  );
};
