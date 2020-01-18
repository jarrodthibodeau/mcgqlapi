const cheerio = require('cheerio');
const { isTitleSafeToWrite, stripTitle } = require('../helpers/helpers');
const { getItem, saveItem } = require('../helpers/mongo');
const { get } = require('../helpers/request');

const AlbumDetails = require('../details/album');
const GameDetails = require('../details/game');
const MovieDetails = require('../details/movie');
const TVShowDetails = require('../details/tvshow');

module.exports = async function getInfo(url, input, type) {
  try {
    if (process.env.SAVE_TO_DB === true) {
      const item = await getItem(input, type);

      if (item) {
        return item;
      }
    }

    const html = await get(url, 1);
    const $ = cheerio.load(html);
    let details;

    switch (type) {
      case 'album':
        details = AlbumDetails($);
        break;
      case 'game':
        details = GameDetails($);
        break;
      case 'movie':
        details = MovieDetails($);
        break;
      case 'tvshow':
        details = TVShowDetails($, { season: input.season });
        break;
    }

    if (process.env.SAVE_TO_DB === true) {
      if (isTitleSafeToSave) {
        await saveItem(details, type);
      }
    }
    
    return details;
  } catch (err) {
    throw new Error(err);
  }
};
