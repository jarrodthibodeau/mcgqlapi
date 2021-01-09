import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from '../src/typeDefs';
import { resolvers } from '../src/resolvers';
import { getDb } from '../src/helpers/mongo';

const apolloServer = new ApolloServer({
  resolvers,
  typeDefs,
  context: async () => {
    const db = await getDb();
    return { db };
  },
  introspection: true,
  playground: true,
});

export default apolloServer.createHandler({ path: '/api' });
