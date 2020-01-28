module.exports = function GameDetails($, url) {
  const title = $('.product_title a h1').text();
  const platform = $('.platform').text().trim();
  const criticScore = parseInt($('.metascore_w.game > span').text());
  const developer = $('.developer > .data')
    .text()
    .trim();
  const genreList = $('.product_genre > .data');
  const genres = [];
  const publisher = $('.publisher > .data > a');
  const publishers = [];
  const releaseDate = $('.release_data > .data').text();
  const numOfEachReview = $('.total > .count');
  const reviewCount = [];

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

  return {
    url,
    title,
    platform,
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
};
