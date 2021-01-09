import { MongoClient, Db } from 'mongodb';
import { logger } from '../helpers/logger';

export async function getDb(): Promise<Db | void> {
  if (!process.env.MONGODB_URI) {
    return;
  }

  const connection = await new MongoClient(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
  }).connect();


  return connection.db('metacritic-graphql-api');
}

export async function getItem(query, db, collectionName) {
  try {

    const collection = await db
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
    return item;
  } catch (e) {
    logger.error('Getting item from MongoDB failed', e);
    return e;
  }
}

export async function saveItem(item, db, collectionName) {
  try {
    const collection = await db
      .collection(collectionName);

    await collection.insertOne(item);

    logger.info('Product has been saved', item, collectionName);
  } catch (e) {
    logger.error('Saving item to MongoDB failed', e);
    return e;
  }
}
