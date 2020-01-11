const { query } = require('../index');
const { gql } = require('apollo-server');
const { should } = require('chai');

should();

describe('Album', () => {
  it('should retrieve information about an album when provided a artist and album title', async () => {
    const albumQuery = gql`
      query($input: Album!) {
        album(input: $input) {
          album
          artist
          criticScore
          genres
          numOfCriticReviews
          numOfPositiveCriticReviews
          numOfMixedCriticReviews
          numOfNegativeCriticReviews
        }
      }
    `;

    const albumQueryResult = await query({
      query: albumQuery,
      variables: {
        input: {
          artist: 'Danny Brown',
          album: 'uknowhatimsayin¿'
        }
      }
    });

    const { album } = albumQueryResult.data;

    album.artist.should.equal('Danny Brown');
    album.album.should.equal('uknowhatimsayin¿');
    album.genres.should.be.a('array');
    album.criticScore.should.be.a('number');
    album.numOfCriticReviews.should.be.a('number');
    album.numOfPositiveCriticReviews.should.be.a('number');
    album.numOfMixedCriticReviews.should.be.a('number');
    album.numOfNegativeCriticReviews.should.be.a('number');
  });
});
