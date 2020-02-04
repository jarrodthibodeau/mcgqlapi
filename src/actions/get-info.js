const cheerio = require('cheerio');
const { isTitleSafeToSave, determineMoviePage } = require('../helpers/helpers');
const { getItem, saveItem } = require('../helpers/mongo');
const { get } = require('../helpers/request');
const logger = require('../helpers/logger');

const AlbumDetails = require('../details/album');
const GameDetails = require('../details/game');
const MovieDetails = require('../details/movie');
const TVShowDetails = require('../details/tvshow');

module.exports = async function getInfo(url, input, type) {
  logger.info('Getting info', input, type);

  try {
    if (process.env.SAVE_TO_DB == 'true') {
      const item = await getItem({ url }, type);

      if (item) {
        logger.info('Item found in DB', input, type);
        return item;
      }
    }

    let $;

    if (type !== 'movie') {
      const html = await get(url, 1);
      $ = cheerio.load(html);
    } else {
      const pages = [
        { url: url[0], content: await get(url[0], 1) },
        { url: url[1], content: await get(url[1], 1) }
      ];
      
      const { parsedContent, url: correctUrl } = determineMoviePage(pages, input.year);
      $ = parsedContent;
      url = correctUrl;
    }

    let details;

    switch (type) {
      case 'album':
        details = AlbumDetails($, url);
        break;
      case 'game':
        details = GameDetails($, url);
        break;
      case 'movie':
        details = MovieDetails($, url);
        break;
      case 'tvshow':
        details = TVShowDetails($, url, { season: input.season });
        break;
    }

    if (isNaN(details.criticScore)) {
      logger.error(`Product has no reviews or does not exist`, input);
      throw new Error(`Product has no reviews or does not exist for: ${JSON.stringify(input, 2)}, ${type}`);
    }

    if (process.env.SAVE_TO_DB == 'true') {
      if (isTitleSafeToSave) {
        await saveItem(details, type);
      }
    }

    logger.info('Getting info succeeded', input, type);
    
    return details;
  } catch (err) {
    logger.error('Error getting info', err);
    throw new Error(err);
  }
};
