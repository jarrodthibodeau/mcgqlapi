const path = require('path');
const logger = require('./src/helpers/logger');
const server = require('./src/server');

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
