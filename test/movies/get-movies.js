const { query } = require('../index');
const { gql } = require('apollo-server');
const { should } = require('chai');

should();

describe('Movies', () => {
  it('should successfully retrieve information on multiple movies', (done) => {
    const moviesQuery = gql`
      query($input: [Movie!]) {
        movies(input: $input) {
          title
          criticScore
        }
      }
    `;

    const testMovies = [
      { title: 'Little Women' },
      { title: 'Little Women 2019' },
      { title: 'Raging Bull' },
      { title: 'Good Time' },
      { title: 'Toy Story 2' }
    ];

    setTimeout(async () => {
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
      });

      done();
    }, 15000)

  });
});
