const path = require('path');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const root = require('./src/root');
const schema = require('./src/schema');

const server = new ApolloServer({ typeDefs: schema, resolvers: root, playground: process.env.ENVIRONMENT === 'prod' ? false : true });
const app = express();

app.use(express.static(path.resolve(__dirname, './src/assets')));

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, './src/index.html'));
});

app.get('/_status', function(req, res)  {
  res.send({ status : 'ok' });
});

server.applyMiddleware({ app });

require('dotenv').config({
    path: path.resolve(__dirname, `./${process.env.ENVIRONMENT}.env`)
});

app.listen({ port: 8081 }, () => {
    console.log('Metacritic GraphQL API running on port 8081');
});

module.exports = server;
