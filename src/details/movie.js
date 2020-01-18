module.exports = function MovieDetails($) {
  const title = $('.product_page_title h1').text();
  const year = $('.release_year').text();
  const genreList = $('.genres span:last-child');
  const genres = [];
  const numOfEachReview = $('.count.fr');
  const reviewCount = [];
  const releaseDate = $('.release_date span:last-child').text();
  const directorList = $('.director > a');
  const director = [];
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

  for (let i = 0; i < directorList.length; i++) {
    director.push(directorList[i].children[0].children[0].data);
  }

  return {
    title,
    year,
    criticScore: parseInt(
      $('.metascore_w.larger.movie')
        .text()
        .substr(0, 2)
    ),
    director,
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
  };
};
