import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import { db } from "./db/db";
import fs from "fs";
import { Query } from "./resolvers/Query";

const yoga = createYoga({
    schema: createSchema({
      typeDefs:  fs.readFileSync(
        "src/schema/schema.graphql",
        "utf-8"
      ),
      resolvers: {
        Query
      },
    }),

    context: { db },

});

const server = createServer(yoga);
server.listen(4000, () => {
    console.info("Server is running on http://localhost:4000/graphql");
  });