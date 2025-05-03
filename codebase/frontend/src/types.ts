export type Charge = {
  id: string;
  accountId: string;
  date: string;
  amount: number;
};

export type Account = {
  id: string;
  type: 'ELECTRICITY' | 'GAS';
  address: string;
  meterNumber?: string;
  volume?: number;
  balance: number;
  charges: Charge[];
};
