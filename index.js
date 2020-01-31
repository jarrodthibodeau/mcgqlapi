const path = require('path');
const root = require('./src/root');
const schema = require('./src/schema');
const logger = require('./src/helpers/logger');
const { ApolloServer } = require('apollo-server-lambda');

const server = new ApolloServer({ 
  typeDefs: schema, 
  resolvers: root, 
  playground: process.env.ENVIRONMENT === 'prod' ? false : true,
});

require('dotenv').config({
    path: path.resolve(__dirname, `./${process.env.ENVIRONMENT}.env`)
});

module.exports = {
  server
};

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true
  }
});
