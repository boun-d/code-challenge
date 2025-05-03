import { GraphqlContext } from "../types";

export const chargesResolvers = {
  Query: {
    getCharges: async (_: any, __: any, { dataSources }: GraphqlContext) => {
      return dataSources.chargesDataSource.getCharges();
    },
    getCharge: async (
      _: any,
      { id }: { id: string },
      { dataSources }: GraphqlContext
    ) => {
      return dataSources.chargesDataSource.getCharge(id);
    },
  },
};
