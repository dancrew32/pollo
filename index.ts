import { ApolloServer } from 'apollo-server';

import {resolvers} from './resolvers';
import {typeDefs} from './typeDefs';

const server = new ApolloServer({
  typeDefs, 
  resolvers,
  tracing: true,
});

server.listen().then(({ url }) => console.info(url));