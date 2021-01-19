import { load }  from 'cheerio';
import { isTitleSafeToSave, determineMoviePage } from '../helpers/helpers';
import { getItem, saveItem } from '../helpers/mongo';
import { get } from '../helpers/request';
import { logger } from '../helpers/logger';
import { Db } from 'mongodb';
import { MediaType } from '../types/enums';
import { AlbumInput, GameInput, MovieInput, TVShowInput } from '../types/inputs';

const AlbumDetails = require('../details/album');
const GameDetails = require('../details/game');
const MovieDetails = require('../details/movie');
const TVShowDetails = require('../details/tvshow');

export async function getInfo(url: string | string[], db: Db, input: AlbumInput | GameInput | MovieInput | TVShowInput, type: MediaType) {
  logger.info('Getting info', input, type);

  try {
    if (process.env.SAVE_TO_DB == 'true') {
      const item = await getItem({ url }, db,  type);

      if (item) {
        logger.info('Item found in DB', input, type);
        return item;
      }
    }

    let $;

    if (type !== MediaType.Movie && typeof url === 'string') {
      const html = await get(url, 1);
      $ = load(html);
    } else {
      const pages = [
        { url: url[0], content: await get(url[0], 1) },
        { url: url[1], content: await get(url[1], 1) },
      ];

      const { parsedContent, url: correctUrl } = determineMoviePage(
        pages,
        input.year
      );
      $ = parsedContent;
      url = correctUrl;
    }

    let details;

    switch (type) {
      case MediaType.Album:
        details = AlbumDetails($, url);
        break;
      case MediaType.Game:
        details = GameDetails($, url);
        break;
      case MediaType.Movie:
        details = MovieDetails($, url);
        break;
      case MediaType.TVShow:
        details = TVShowDetails($, url, { season: input.season });
        break;
    }

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
