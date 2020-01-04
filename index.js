const path = require('path');
const { ApolloServer } = require('apollo-server');
const root = require('./src/root');
const schema = require('./src/schema');

const server = new ApolloServer({ typeDefs: schema, resolvers: root });

require('dotenv').config({
    path: path.resolve(__dirname, `./${process.env.ENVIRONMENT}.env`)
});

server.listen().then(() => {
    console.log('Metacritic GraphQL API running on port 4000');
});

module.exports = server;