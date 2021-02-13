import { AlbumDetails } from '../types';

export function Album($: cheerio.Root, url: string): AlbumDetails {
  const artist = $('.product_artist .band_name').text();
  const album = $('.product_title a span h1').text().trim();
  const criticScore = parseInt($('.metascore_w.album > span').text());
  const genres = [];
  const genreList = $('.product_genre > .data');
  const publisher = $('.company.publisher span a span').text().trim();
  const reviewCount = [];
  const numOfEachReview = $('.total > .count');
  const releaseDate = $('.release > .data').text();
  const productImage = $('.product_image.large_image').find('img').attr('src');

  for (let i = 0; i < numOfEachReview.length; i++) {
    const el = numOfEachReview[i] as cheerio.TagElement;
    reviewCount.push(parseInt(el.children[0].data.replace(',', '')));
  }

  for (let i = 0; i < genreList.length; i++) {
    const el = genreList[i] as cheerio.TagElement;
    genres.push(el.children[0].data);
  }

  return {
    url,
    artist,
    album,
    criticScore,
    publisher,
    genres,
    releaseDate,
    numOfCriticReviews: reviewCount[0] + reviewCount[1] + reviewCount[2],
    numOfPositiveCriticReviews: reviewCount[0],
    numOfMixedCriticReviews: reviewCount[1],
    numOfNegativeCriticReviews: reviewCount[2],
    productImage
  };
}
