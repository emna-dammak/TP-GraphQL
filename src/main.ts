import { createPubSub, createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import fs from "fs";
import { resolvers } from "./schema";
import { createContext } from "./context";


const pubSub = createPubSub();
const yoga = createYoga({
  schema: createSchema({
    typeDefs: fs.readFileSync("src/schema/schema.graphql", "utf-8"),
    resolvers: {
      Query: resolvers.Query,
      CV: resolvers.CV,
      Mutation: resolvers.Mutation
    },
  }),


  context: createContext,
});


const server = createServer(yoga);
server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});
