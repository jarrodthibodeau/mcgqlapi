const https = require('https');
const cheerio = require('cheerio');

const {
  isTitleSafeToWrite,
  stripTitle 
} = require('../helpers/helpers');

const {
  getItem,
  saveItem
} = require('../helpers/mongo');

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
      const game = await getItem({ title }, 'games');

      if (game) {
        return resolve(game);
      }
    }


    https.get(url, res => {
      let html = '';

      res.on('data', chunk => {
        html += chunk;
      });

      res.on('end', async () => {
        const $ = cheerio.load(html);
        const criticScore = parseInt($('.metascore_w.game > span').text());
        const genres = $('.product_genre > .data');
        const developer = $('.developer > .data')
          .text()
          .trim();
        const publisher = $('.publisher > .data > a');
        const releaseDate = $('.release_data > .data').text();
        const numOfEachReview = $('.total > .count');
        const reviewCount = [];
        const newGenres = [];
        const publishers = [];

        for (let i = 0; i < numOfEachReview.length; i++) {
          reviewCount.push(
            parseInt(numOfEachReview[i].children[0].data.replace(',', ''))
          );
        }

        for (let i = 0; i < genres.length; i++) {
          newGenres.push(genres[i].children[0].data);
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
          genres: newGenres.join(', '),
          releaseDate,
          numOfCriticReviews: reviewCount[0] + reviewCount[1] + reviewCount[2],
          numOfPositiveCriticReviews: reviewCount[0],
          numOfMixedCriticReviews: reviewCount[1],
          numOfNegativeCriticReviews: reviewCount[2]
        }

        if (process.env.SAVE_TO_DB) {
          if (isTitleSafeToWrite(releaseDate)) {
            await saveItem(gameInfo, 'games');
          }
        }

        return resolve(gameInfo);
      });
    });
  });
};
