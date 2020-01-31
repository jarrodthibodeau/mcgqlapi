const root = require('./root');
const schema = require('./schema');
const { ApolloServer } = require('apollo-server-lambda');

const server = new ApolloServer({ 
  typeDefs: schema, 
  resolvers: root, 
  playground: process.env.ENVIRONMENT === 'prod' ? false : true,
});

module.exports = server;
