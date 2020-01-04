const { query } = require('../index');
const { gql } = require('apollo-server');
const { should } = require('chai');

should();

describe('Movie', () => {
  it('should get information about a movie if a title is provided', async () => {
    const movieQuery = gql`
      query($input: Movie!) {
        movie(input: $input) {
          title
          director
          runtime
          criticScore
        }
      }
    `;

    const movieQueryResult = await query({
      query: movieQuery,
      variables: {
        input: {
          title: 'Parasite'
        }
      }
    });

    const { movie } = movieQueryResult.data;

    movie.title.should.equal('Parasite');
    movie.director.should.equal('Joon-ho Bong');
    movie.runtime.should.equal('132 min');
    movie.criticScore.should.be.a('number');
  });
});
