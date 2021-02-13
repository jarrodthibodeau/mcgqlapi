import { GameDetails } from '../types';

export function Game($: cheerio.Root, url: string): GameDetails {
  const title = $('.product_title a h1').text();
  const platform = $('.platform').text().trim();
  const criticScore = parseInt($('.metascore_w.game > span').text());
  const developer = $('.developer > .data').text().trim();
  const genreList = $('.product_genre > .data');
  const genres = [];
  const publisher = $('.publisher > .data > a');
  const publishers = [];
  const releaseDate = $('.release_data > .data').text();
  const numOfEachReview = $('.total > .count');
  const reviewCount = [];
  const productImage = $('.product_image.large_image').find('img').attr('src');

  for (let i = 0; i < numOfEachReview.length; i++) {
    const el = numOfEachReview[i] as cheerio.TagElement;
    reviewCount.push(parseInt(el.children[0].data.replace(',', '')));
  }

  for (let i = 0; i < genreList.length; i++) {
    const el = genreList[i] as cheerio.TagElement;
    genres.push(el.children[0].data);
  }

  for (let i = 0; i < publisher.length; i++) {
    const el = publisher[i] as cheerio.TagElement;
    publishers.push(el.children[0].data.trim());
  }

  return {
    url,
    title,
    platform,
    criticScore,
    developer,
    publisher: publishers,
    genres,
    releaseDate,
    numOfCriticReviews: reviewCount[0] + reviewCount[1] + reviewCount[2],
    numOfPositiveCriticReviews: reviewCount[0],
    numOfMixedCriticReviews: reviewCount[1],
    numOfNegativeCriticReviews: reviewCount[2],
    productImage
  };
}
