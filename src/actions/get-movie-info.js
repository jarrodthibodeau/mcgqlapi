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


    https.get(url, res => {
      let html = '';

      res.on('data', chunk => {
        html += chunk;
      });

      res.on('end', async () => {
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
          cast: $('.summary_cast span:last-child')
            .text()
            .trim(),
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
            await saveItem(movieInfo, 'movies');
          }
        }

        return resolve(movieInfo);
      });
    });
  });
};
