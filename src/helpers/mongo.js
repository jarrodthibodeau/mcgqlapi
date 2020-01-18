const { MongoClient } = require('mongodb');

async function getItem(query, collectionName) {
  try {
    const connection = await new MongoClient(process.env.MONGODB_URI, {
      useUnifiedTopology: true
    }).connect();
    const collection = await connection
      .db('metacritic-graphql-api')
      .collection(collectionName);
    
    const item = await collection.findOne(query);
    await connection.close();
    return item;
  } catch (e) {
    console.log(e);
    return e;
  }
}

async function saveItem(item, collectionName) {
  try {
    const connection = await MongoClient.connect(process.env.MONGODB_URI);
    const collection = await connection
      .db('metacritic-graphql-api')
      .collection(collectionName);
    await collection.insertOne(item);

    return connection.close();
  } catch (e) {
    console.log(e);
    return e;
  }
}

module.exports = {
  getItem,
  saveItem
};
