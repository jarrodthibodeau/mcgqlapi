const server = require('../src/server');
const testServer = require('apollo-server-testing');

process.env.SAVE_TO_DB = false;
process.env.DAYS_TIL_SAVE_TO_DB = 30;

module.exports = testServer.createTestClient(server);
