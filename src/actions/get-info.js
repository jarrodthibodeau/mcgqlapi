const cheerio = require('cheerio');
const { isTitleSafeToSave } = require('../helpers/helpers');
const { getItem, saveItem } = require('../helpers/mongo');
const { get } = require('../helpers/request');
const logger = require('../helpers/logger');

const AlbumDetails = require('../details/album');
const GameDetails = require('../details/game');
const MovieDetails = require('../details/movie');
const TVShowDetails = require('../details/tvshow');

module.exports = async function getInfo(url, input, type) {
  logger.info('Getting info for: ', input, type);

  try {
    if (process.env.SAVE_TO_DB == 'true' && process.env.ENVIRONMENT !== 'test') {
      const item = await getItem({ url }, type);

      if (item) {
        logger.info('Item found in db for: ', input, type);
        return item;
      }
    }

    const html = await get(url, 1);
    const $ = cheerio.load(html);
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
      throw new Error(`Product not found for: ${JSON.stringify(input, 2)}, ${type}`);
    }

    if (process.env.SAVE_TO_DB == 'true' && process.env.ENVIRONMENT !== 'test') {
      if (isTitleSafeToSave) {
        await saveItem(details, type);
      }
    }

    logger.info('Getting info succeeded for: ', input, type);
    
    return details;
  } catch (err) {
    throw new Error(err);
  }
};
