import { accountsResolvers } from "./accounts.resolvers";
import { GraphqlContext } from "../types";

const mockGetAccounts = jest.fn();
const mockGetAccount = jest.fn();
const mockMakePayment = jest.fn();

const mockContext: GraphqlContext = {
    dataSources: {
        accountsDataSource: {
            getAccounts: mockGetAccounts,
            getAccount: mockGetAccount,
            makePayment: mockMakePayment,
        },
    },
} as any;

// TODO Add proper mock stub function for GraphqlContext
// TODO Add proper mock stub function for dataSources

describe('Accounts Resolver', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return all accounts', async () => {
        mockGetAccounts.mockResolvedValue([{ id: '1', address: '123 Main St', balance: 100 }]);

        const accounts = await accountsResolvers.Query.getAccounts(null, null, mockContext);
        expect(accounts).toEqual([{ id: '1', address: '123 Main St', balance: 100 }]);
        expect(mockGetAccounts).toHaveBeenCalledWith();
    });

    it('should return a single account', async () => {
        mockGetAccount.mockResolvedValue({ id: '1', address: '123 Main St', balance: 100 });

        const account = await accountsResolvers.Query.getAccount(null, { id: '1' }, mockContext);
        expect(account).toEqual({ id: '1', address: '123 Main St', balance: 100 });
        expect(mockGetAccount).toHaveBeenCalledWith('1');
    });

    it('should make a payment', async () => {
        const mockCharge = {
            id: expect.any(String),
            accountId: '1',
            amount: 100,
            date: expect.any(String)
        };
        mockMakePayment.mockResolvedValue({ id: '1', address: '123 Main St', balance: 100 });

        const result = await accountsResolvers.Mutation.makePayment(null, { accountId: '1', amount: 100 }, mockContext);
        expect(result).toEqual({ id: '1', address: '123 Main St', balance: 100 });
        expect(mockMakePayment).toHaveBeenCalledWith('1', mockCharge);
    });
});
