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

const { get } = require('../helpers/request');

module.exports = function getMovieInfo({ title }) {
  return new Promise(async (resolve, reject) => {
    const url = `https://www.metacritic.com/movie/${stripTitle(title)
      .split(' ')
      .join('-')
      .toLowerCase()}`;

    if (process.env.SAVE_TO_DB) {
      const movie = await getItem({ title }, 'movies');
      
      if (movie) {
        return resolve(movie);
      } 
    }

    try {
      const html = await get(url, 1);

      const $ = cheerio.load(html);
      const genreList = $('.genres span:last-child');
      const genres = [];
      const numOfEachReview = $('.count.fr');
      const reviewCount = [];
      const releaseDate = $('.release_date span:last-child').text();
      const castList = $('.summary_cast.details_section span:last-child a');
      const cast = [];

      for (let i = 0; i < numOfEachReview.length; i++) {
        reviewCount.push(
          parseInt(numOfEachReview[i].children[0].data.replace(',', ''))
        );
      }

      for (let i = 0; i < castList.length; i++) {
        cast.push(castList[i].children[0].data);
      }

      // [0] is \n
      for (let i = 1; i < genreList.length; i++) {
        genres.push(genreList[i].children[0].data);
      }

      const movieInfo = {
        title: title,
        criticScore: parseInt(
          $('.metascore_w.larger.movie')
            .text()
            .substr(0, 2)
        ),
        director: $('.director > a').text(),
        releaseDate,
        runtime: $('.runtime span:last-child').text(),
        rating: $('.rating span:last-child')
          .text()
          .trim(),
        cast,
        genres,
        summary: $('.summary_deck .blurb.blurb_expanded')
          .text()
          .trim(),
        numOfCriticReviews: reviewCount[0] + reviewCount[1] + reviewCount[2],
        numOfPositiveCriticReviews: reviewCount[0],
        numOfMixedCriticReviews: reviewCount[1],
        numOfNegativeCriticReviews: reviewCount[2]
      }

      if (process.env.SAVE_TO_DB) {
        if (isTitleSafeToWrite(releaseDate)) {
          await saveItem(movieInfo, 'movies');
        }
      }

      return resolve(movieInfo);
    } catch (err) {
      return reject(err);
    }
  });
};
