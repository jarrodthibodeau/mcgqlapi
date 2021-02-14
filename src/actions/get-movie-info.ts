import {
  isTitleSafeToSave,
  determineMoviePage,
  getItem,
  saveItem,
  get,
  logger
} from '../helpers';
import { Db } from 'mongodb';
import { Movie } from '../details';
import { MoviePage, MovieInput } from '../types';

export async function getMovieInfo(
  url: string | string[],
  db: Db,
  input: MovieInput
) {
  const { type } = input;

  logger.info('Getting info', input, type);

  try {
    if (process.env.SAVE_TO_DB == 'true') {
      const item = await getItem({ url }, db, type);

      if (item) {
        logger.info('Item found in DB', input, type);
        return item;
      }
    }

    const pages: MoviePage[] = [
      { url: url[0], content: await get(url[0], 1) },
      { url: url[1], content: await get(url[1], 1) }
    ];

    const { parsedContent, url: correctUrl } = determineMoviePage(
      pages,
      input.year
    );
    const $ = parsedContent;
    url = correctUrl;

    const details = Movie($, url);

    if (isNaN(details.criticScore)) {
      logger.error(`Product has no reviews or does not exist`, input);
      throw new Error(
        `Product has no reviews or does not exist for: ${JSON.stringify(
          input,
          null,
          2
        )}, ${type}`
      );
    }

    if (process.env.SAVE_TO_DB == 'true') {
      if (isTitleSafeToSave) {
        await saveItem(details, db, type);
      }
    }

    logger.info('Getting info succeeded', input, type);

    return details;
  } catch (err) {
    logger.error('Error getting info ', err);
    throw new Error(err);
  }
}
