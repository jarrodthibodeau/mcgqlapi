const path = require('path');
const { ApolloServer } = require('apollo-server');
const root = require('./src/root');
const schema = require('./src/schema');

const server = new ApolloServer({ typeDefs: schema, resolvers: root });

require('dotenv').config({
    path: path.resolve(__dirname, `./${process.env.ENVIRONMENT}.env`)
});

server.listen({ port: 8081 }).then(() => {
    console.log('Metacritic GraphQL API running on port 8081');
});

module.exports = server;