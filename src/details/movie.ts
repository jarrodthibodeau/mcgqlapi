module.exports = function MovieDetails($, url) {
  const title = $('.product_page_title h1').text();
  const year = $('.release_year').text();
  const criticScore = parseInt(
    $('.metascore_w.larger.movie')
      .text()
      .substr(0, 2)
  );
  const genreList = $('.genres span:last-child');
  const genres = [];
  const summary = $('.summary_deck .blurb.blurb_expanded')
    .text()
    .trim();
  const numOfEachReview = $('.count.fr');
  const reviewCount = [];
  const releaseDate = $('.release_date span:last-child').text();
  const runtime = $('.runtime span:last-child').text();
  const rating = $('.rating span:last-child')
    .text()
    .trim();
  const directorList = $('.director > a');
  const director = [];
  const castList = $('.summary_cast.details_section span:last-child a');
  const cast = [];
  const productImage = $('.summary_img').attr('src');

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

  for (let i = 0; i < directorList.length; i++) {
    director.push(directorList[i].children[0].children[0].data);
  }

  return {
    url,
    title,
    year,
    criticScore,
    director,
    releaseDate,
    runtime,
    rating,
    cast,
    genres,
    summary,
    numOfCriticReviews: reviewCount[0] + reviewCount[1] + reviewCount[2],
    numOfPositiveCriticReviews: reviewCount[0],
    numOfMixedCriticReviews: reviewCount[1],
    numOfNegativeCriticReviews: reviewCount[2],
    productImage
  };
};
