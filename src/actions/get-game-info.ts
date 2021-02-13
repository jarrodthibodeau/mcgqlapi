import { load } from 'cheerio';
import { isTitleSafeToSave, determineMoviePage } from '../helpers/helpers';
import { getItem, saveItem } from '../helpers/mongo';
import { get } from '../helpers/request';
import { logger } from '../helpers/logger';
import { Db } from 'mongodb';
import { Game } from '../details/game';
import { GameInput } from '../types/inputs';

export async function getGameInfo(url: string, db: Db, input: GameInput) {
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

    const html = await get(url, 1);
    const $ = load(html);
    const details = Game($, url);

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
