const cheerio = require('cheerio');
const { isTitleSafeToWrite, stripTitle } = require('../helpers/helpers');
const { getItem, saveItem } = require('../helpers/mongo');
const { get } = require('../helpers/request');

module.exports = function getGameInfo({ title, console }) {
  return new Promise(async (resolve, reject) => {
    const url = `https://www.metacritic.com/game/${console
      .split(' ')
      .join('-')
      .toLowerCase()}/${stripTitle(title)
      .split(' ')
      .join('-')
      .toLowerCase()}`;

    if (process.env.SAVE_TO_DB) {
      const game = await getItem({ console, title }, 'games');

      if (game) {
        return resolve(game);
      }
    }

    try {
      const html = await get(url, 1);

      const $ = cheerio.load(html);
      const criticScore = parseInt($('.metascore_w.game > span').text());
      const genreList = $('.product_genre > .data');
      const genres = [];
      const developer = $('.developer > .data')
        .text()
        .trim();
      const publisher = $('.publisher > .data > a');
      const releaseDate = $('.release_data > .data').text();
      const numOfEachReview = $('.total > .count');
      const reviewCount = [];
      const publishers = [];

      for (let i = 0; i < numOfEachReview.length; i++) {
        reviewCount.push(
          parseInt(numOfEachReview[i].children[0].data.replace(',', ''))
        );
      }

      for (let i = 0; i < genreList.length; i++) {
        genres.push(genreList[i].children[0].data);
      }

      for (let i = 0; i < publisher.length; i++) {
        publishers.push(publisher[i].children[0].data.trim());
      }

      const gameInfo = {
        title: title,
        console: console,
        criticScore,
        developer,
        publisher: publishers.join(', '),
        genres,
        releaseDate,
        numOfCriticReviews: reviewCount[0] + reviewCount[1] + reviewCount[2],
        numOfPositiveCriticReviews: reviewCount[0],
        numOfMixedCriticReviews: reviewCount[1],
        numOfNegativeCriticReviews: reviewCount[2]
      };

      if (process.env.SAVE_TO_DB) {
        if (isTitleSafeToWrite(releaseDate)) {
          await saveItem(gameInfo, 'games');
        }
      }

      return resolve(gameInfo);
    } catch (err) {
      return reject(err);
    }
  });
};
