const { query } = require('../../index');
const { gql } = require('apollo-server-lambda');
const { should } = require('chai');

should();

describe('Albums', () => {
  it('should successfully retrieve information on multiple albums', async () => {
    const albumsQuery = gql`
      query($input: [Album!]) {
        albums(input: $input) {
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

    const testAlbums = [
      {
        artist: 'Idles',
        album: 'Joy As an Act of Resistance'
      },
      {
        artist: 'Carly Rae Jepsen',
        album: 'E-MO-TION'
      },
      {
        artist: 'Lizzo',
        album: 'Cuz I Love You'
      },
      {
        artist: 'Kacey Musgraves',
        album: 'Golden Hour'
      },
      {
        artist: 'Run the Jewels',
        album: 'Run the Jewels 3'
      }
    ];
    
    const albumsQueryResult = await query({
      query: albumsQuery,
      variables: {
        input: testAlbums
      }
    });

    const { albums } = albumsQueryResult.data;

    albums.forEach((album, index) => {
      album.artist.should.equal(testAlbums[index].artist);
      album.album.should.equal(testAlbums[index].album);
      album.criticScore.should.be.a('number');
      album.genres.should.be.a('array');
      album.numOfCriticReviews.should.be.a('number');
      album.numOfPositiveCriticReviews.should.be.a('number');
      album.numOfMixedCriticReviews.should.be.a('number');
      album.numOfNegativeCriticReviews.should.be.a('number');
    });
  });
});
