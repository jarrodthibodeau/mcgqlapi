const cheerio = require('cheerio');
const { isTitleSafeToSave } = require('../helpers/helpers');
const { getItem, saveItem } = require('../helpers/mongo');
const { get } = require('../helpers/request');
const logger = require('../helpers/logger');

const AlbumDetails = require('../details/album');
const GameDetails = require('../details/game');
const MovieDetails = require('../details/movie');
const TVShowDetails = require('../details/tvshow');

function loadMoviePages(pages, releaseYear) {  
  const $$ = [
    cheerio.load(pages[0].content),
    cheerio.load(pages[1].content)
  ];

  for (let  i = 0; i < $$.length; i++) {
    if ($$[i]('.release_year').text() === releaseYear) {;
      return { ...pages[i], parsedContent: $$[i] };
    }
  }
}

module.exports = async function getInfo(url, input, type) {
  logger.info('Getting info', input, type);

  try {
    if (process.env.SAVE_TO_DB == 'true' && process.env.ENVIRONMENT !== 'test') {
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
      
      const { parsedContent, url: correctUrl } = loadMoviePages(pages, input.year);
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
      logger.error(`Product not found`, input);
      throw new Error(`Product not found for: ${JSON.stringify(input, 2)}, ${type}`);
    }

    if (process.env.SAVE_TO_DB == 'true' && process.env.ENVIRONMENT !== 'test') {
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
