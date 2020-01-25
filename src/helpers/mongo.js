const { MongoClient } = require('mongodb');
const { slugItem } = require('../helpers/helpers')

async function getItem(query, collectionName) {
  try {
    const connection = await new MongoClient(process.env.MONGODB_URI, {
      useUnifiedTopology: true
    }).connect();
    const collection = await connection
      .db('metacritic-graphql-api')
      .collection(collectionName);

    console.log('Finding product for:', query, collectionName);
    const slug = slugItem(query, collectionName);

    const item = await collection.findOne({slug});
    await connection.close();
    return item;
  } catch (e) {
    console.log(e);
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

    // This to ensure case-insensitivities are accounted for
    item.slug = slugItem(item, collectionName);

    await collection.insertOne(item);

    console.log('Product has been saved', item, collectionName);

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
