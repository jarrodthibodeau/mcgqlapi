import { MongoClient } from 'mongodb';
import { logger } from '../helpers/logger';

export async function getItem(query, collectionName) {
  try {
    const connection = await new MongoClient(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
    }).connect();
    const collection = await connection
      .db('metacritic-graphql-api')
      .collection(collectionName);

    logger.info('Finding product', query, collectionName);

    let item;

    if (collectionName !== 'movie') {
      item = await collection.findOne(query);
    } else {
      const { url: urls } = query;
      const urlWithYearSplit = urls[1].split('-');
      const yearInURL = urlWithYearSplit[urlWithYearSplit.length - 1];

      item = await collection.findOne({
        $or: [{ url: urls[0] }, { url: urls[1] }],
        year: yearInURL,
      });
    }

    await connection.close();
    return item;
  } catch (e) {
    logger.error('Getting item from MongoDB failed', e);
    return e;
  }
}

export async function saveItem(item, collectionName) {
  try {
    const connection = await new MongoClient(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
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
