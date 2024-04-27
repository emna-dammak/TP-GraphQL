import { makeExecutableSchema } from '@graphql-tools/schema';
import type { Cv } from '../prisma/generated/client'
import type { GraphQLContext } from './context';
import fs from 'fs';

    export const resolvers = {

    Query: {
        info: () => `This is the API of your CV application`,
        getAllCVs: (parent: unknown, args: {}, context: GraphQLContext) => context.getAllCVs()
    },
    
    CV: {
        id: (parent: Cv) => parent.id,
        name: (parent: Cv) => parent.name,
    },

    Mutation: {
    async createCv(
        parent: unknown,
        args: { data: any },
        context: GraphQLContext
    ) {
        const newCv = await context.createCv(args.data);
        return newCv;
    },
    async updateeCv(
        parent: unknown,
        args: { id: string; data: any },
        context: GraphQLContext
    ) {
        const updatedCv = await context.updateCv(args.id, args.data);
        return updatedCv;
    },
    async deleteeCv(
        parent: unknown,
        args: { id: string },
        context: GraphQLContext
    ) {
        const deletedCv = await context.deleteCv(args.id);
        return deletedCv;
    },
  }
  
};


