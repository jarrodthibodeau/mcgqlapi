const cheerio = require('cheerio');

const {
  isTitleSafeToWrite, 
  stripTitle 
} = require('../helpers/helpers');

const {
  getItem,
  saveItem
} = require('../helpers/mongo');

const { get } = require('../helpers/request');

module.exports = function getTVInfo({ title, season }) {
  return new Promise(async (resolve, reject) => {
    let url = `https://www.metacritic.com/tv/${stripTitle(title)
      .split(' ')
      .join('-')
      .toLowerCase()}`;

    if (season) {
      url += `/season-${season}`;
    }

    if (process.env.SAVE_TO_DB) {
      const tvshow = await getItem({ title, season }, 'tvshows');

      if (tvshow) {
        return resolve(tvshow);
      }
    }

    try {
      const html = await get(url, 1);

      const $ = cheerio.load(html);
      const genres = $('.genres span:last-child');
      const numOfEachReview = $('.count.fr');
      const reviewCount = [];
      const releaseDate = $('.release_date span:last-child').text();

      for (let i = 0; i < numOfEachReview.length; i++) {
        reviewCount.push(
          parseInt(numOfEachReview[i].children[0].data.replace(',', ''))
        );
      }

      const tvShowInfo = {
        title: title,
        season: season ? season : 'all',
        criticScore: parseInt(
          $('.metascore_w.larger.tvshow')
            .text()
            .substr(0, 2)
        ),
        releaseDate,
        genres: genres.text().trim(),
        summary: $('.summary_deck span:last-child')
          .text()
          .trim(),
        numOfCriticReviews: reviewCount[0] + reviewCount[1] + reviewCount[2],
        numOfPositiveCriticReviews: reviewCount[0],
        numOfMixedCriticReviews: reviewCount[1],
        numOfNegativeCriticReviews: reviewCount[2]
      }

      if (process.env.SAVE_TO_DB) {
        if (isTitleSafeToWrite(releaseDate)) {
          await saveItem(tvShowInfo, 'tvshows');
        }
      }

      return resolve(tvShowInfo)
    } catch(err) {
      return reject(err);
    }
  });
};
