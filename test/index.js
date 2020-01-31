const server = require('../src/server');
const testServer = require('apollo-server-testing');

process.env.SAVE_TO_DB = false;

module.exports = testServer.createTestClient(server);
