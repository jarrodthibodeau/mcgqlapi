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

module.exports = function getAlbumInfo({ artist, album }) {
  return new Promise(async (resolve, reject) => {
    const url = `https://www.metacritic.com/music/${stripTitle(album)
      .split(' ')
      .join('-')
      .toLowerCase()}/${artist
      .split(' ')
      .join('-')
      .toLowerCase()}`;

    if (process.env.SAVE_TO_DB) {
      const musicAlbum = await getItem({ album, artist }, 'albums');

      if (musicAlbum) {
        return resolve(musicAlbum);
      }
    }

    try {
      const html = await get(url, 1);

      const $ = cheerio.load(html);
      const criticScore = parseInt($('.metascore_w.album > span').text());
      const genres = $('.product_genre > .data');
      const developer = $('.developer > .data')
        .text()
        .trim();
      const publisher = $('.publisher > .data > a');
      const numOfEachReview = $('.total > .count');
      const releaseDate = $('.release > .data').text();
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

      const albumInfo = {
        artist: artist,
        album: album,
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
          await saveItem(albumInfo, 'albums');
        }
      }

      return resolve(albumInfo);
    } catch(err) {
      return reject(err);
    }
  });
};
