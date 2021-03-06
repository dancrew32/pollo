import { ApolloServer } from "apollo-server";

import { resolvers } from "./resolvers/resolvers";
import { typeDefs } from "./typeDefs";
import { context } from "./context";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  cors: {
    origin: "*",
    // credentials: true,
  },
  // tracing: true,
  // playground: false,
});

server.listen().then(({ url }) => console.info(url));
