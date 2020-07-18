const path = require('path');
const logger = require('./src/helpers/logger');
const server = require('./src/server');

require('dotenv').config({
    path: path.resolve(__dirname, `./${process.env.ENVIRONMENT}.env`)
});

if (process.env.ENVIRONMENT === 'prod') {
  exports.graphqlHandler = server.createHandler({
    cors: {
      origin: '*',
      credentials: true
    }
  });  
} else {
  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

