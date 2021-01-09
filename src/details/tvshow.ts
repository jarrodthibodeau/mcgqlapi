module.exports = function TVShowDetails($, url, details) {
  // a tag when it's a season and no a tag when it's just the show overview
  const title = $('.product_page_title h1 a').text() || $('.product_page_title h1').text() ;
  const genreList = $('.genres span:last-child');
  const genres = [];
  const numOfEachReview = $('.count.fr');
  const reviewCount = [];
  const releaseDate = $('.release_date span:last-child').text();
  const summary = $('.summary_deck span span')
    .text()
    .trim();
  const criticScore = parseInt(
    $('.metascore_w.larger.tvshow')
      .text()
      .substr(0, 2)
  );
  const productImage = $('.summary_img').attr('src');

  for (let i = 0; i < numOfEachReview.length; i++) {
    reviewCount.push(
      parseInt(numOfEachReview[i].children[0].data.replace(',', ''))
    );
  }

  // [0] is \n
  for (let i = 1; i < genreList.length; i++) {
    genres.push(genreList[i].children[0].data);
  }

  return {
    url,
    title,
    season: details.season ? details.season : 'all',
    criticScore,
    releaseDate,
    genres,
    summary,
    numOfCriticReviews: reviewCount[0] + reviewCount[1] + reviewCount[2],
    numOfPositiveCriticReviews: reviewCount[0],
    numOfMixedCriticReviews: reviewCount[1],
    numOfNegativeCriticReviews: reviewCount[2],
    productImage
  };
};
