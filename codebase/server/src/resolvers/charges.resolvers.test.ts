
import { chargesResolvers } from "./charges.resolvers";
import { GraphqlContext } from "../types";

const mockGetCharges = jest.fn();
const mockGetCharge = jest.fn();

const mockContext: GraphqlContext = {
    dataSources: {
        chargesDataSource: {
            getCharges: mockGetCharges,
            getCharge: mockGetCharge,
        },
    },
} as any;

// TODO Add proper mock stub function for GraphqlContext
// TODO Add proper mock stub function for dataSources

describe('Charges Resolver', () => {
    it('should return all charges', async () => {
        mockGetCharges.mockResolvedValue([{ id: '1', amount: 100, date: expect.any(String) }]);
        
        const charges = await chargesResolvers.Query.getCharges(null, null, mockContext);
        expect(charges).toEqual([{ id: '1', amount: 100, date: expect.any(String) }]);
    });

    it('should return a single charge', async () => {
        mockGetCharge.mockResolvedValue({ id: '1', amount: 100, date: expect.any(String) });

        const charge = await chargesResolvers.Query.getCharge(null, { id: '1' }, mockContext);
        expect(charge).toEqual({ id: '1', amount: 100, date: expect.any(String) });
    });
});
