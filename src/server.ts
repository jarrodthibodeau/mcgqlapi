const root = require('./root');
const schema = require('./schema');
const { ApolloServer } = require('apollo-server-lambda');
const devServer = require('apollo-server');

let server;

if (process.env.ENVIRONMENT === 'prod') {
  server = new ApolloServer({ 
    typeDefs: schema, 
    resolvers: root, 
    playground: true,
  });
} else {
  server = new devServer.ApolloServer({
    typeDefs: schema, 
    resolvers: root, 
    playground: true,
  });
}




module.exports = server;
