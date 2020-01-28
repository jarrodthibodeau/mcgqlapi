const { MongoClient } = require('mongodb');

async function getItem(query, collectionName) {
  try {
    const connection = await new MongoClient(process.env.MONGODB_URI, {
      useUnifiedTopology: true
    }).connect();
    const collection = await connection
      .db('metacritic-graphql-api')
      .collection(collectionName);

    logger.info('Finding product for:', query, collectionName);

    const item = await collection.findOne(query);
    await connection.close();
    return item;
  } catch (e) {
    logger.error('Getting item from MongoDB failed', e);
    return e;
  }
}

async function saveItem(item, collectionName) {
  try {
    const connection = await new MongoClient(process.env.MONGODB_URI, {
      useUnifiedTopology: true
    }).connect();
    const collection = await connection
      .db('metacritic-graphql-api')
      .collection(collectionName);

    await collection.insertOne(item);

    logger.info('Product has been saved', item, collectionName);

    return connection.close();
  } catch (e) {
    logger.error('Saving item to MongoDB failed', e);
    return e;
  }
}

module.exports = {
  getItem,
  saveItem
};
