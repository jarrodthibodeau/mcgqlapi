import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from '../src/typeDefs';
import { resolvers } from '../src/resolvers';

const apolloServer = new ApolloServer({
  resolvers,
  typeDefs,
  introspection: true,
  playground: true,
});

export default apolloServer.createHandler({ path: '/api' });
