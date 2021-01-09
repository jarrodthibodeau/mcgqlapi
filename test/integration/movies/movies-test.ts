const { query } = require('../../index');
const { gql } = require('apollo-server-lambda');
const { should } = require('chai');

should();

describe('Movies', () => {
  it('should successfully retrieve information on multiple movies', async () => {
    const moviesQuery = gql`
      query($input: [Movie!]) {
        movies(input: $input) {
          title
          criticScore,
          cast,
          genres
        }
      }
    `;

    const testMovies = [
      { title: 'Little Women', year: '1994' },
      { title: 'Little Women', year: '2019' },
      { title: 'Raging Bull', year: '1980'},
      { title: 'Good Time', year: '2017' },
      { title: 'Toy Story 2', year: '1999' }
    ];

    const moviesQueryResult = await query({
      query: moviesQuery,
      variables: {
        input: testMovies
      }
    });

    const { movies } = moviesQueryResult.data;

    movies.forEach((movie, index) => {
      movie.title.should.equal(testMovies[index].title);
      movie.criticScore.should.be.a('number');
      movie.cast.should.be.a('array');
      movie.genres.should.be.a('array');
    });
  });
});
