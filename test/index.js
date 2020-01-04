const server = require('../index');
const testServer = require('apollo-server-testing');

module.exports = testServer.createTestClient(server);