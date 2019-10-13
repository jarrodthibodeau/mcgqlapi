const { ApolloServer } = require('apollo-server');
const root = require('./src/root');
const schema = require('./src/schema');

const server = new ApolloServer({ typeDefs: schema, resolvers: root });

server.listen().then(() => {
    console.log('Metacritic GraphQL API running on port 4000');
});