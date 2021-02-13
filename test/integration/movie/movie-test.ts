import { should } from 'chai';
import { post } from '../../../src/helpers/request';
import { API_URL } from '../config';
import { gql } from 'apollo-server-micro';

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

    const movieQueryResult = await post(API_URL, {
      document: movieQuery,
      variables: {
        input: {
          title: 'Parasite',
          year: '2019'
        }
      }
    });

    const { movie } = movieQueryResult.data;

    movie.title.should.equal('Parasite');
    movie.director.should.be.a('array');
    movie.runtime.should.equal('132 min');
    movie.criticScore.should.be.a('number');
  });
});
