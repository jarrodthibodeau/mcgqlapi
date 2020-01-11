const { query } = require('../index');
const { gql } = require('apollo-server');
const { should } = require('chai');

should();

describe('TV Shows', () => {
  it('should successfully retrieve information on multiple TV Shows', async () => {
    const tvShowsQuery = gql`
      query($input: [TVShow!]) {
        tvshows(input: $input) {
          title
          season
          criticScore
        }
      }
    `;

    const testTVShows = [
      {
        title: 'Game of Thrones',
        season: '1'
      },
      {
        title: 'Breaking Bad',
        season: '2'
      },
      {
        title: 'Hannibal',
        season: '3'
      },
      {
        title: 'Fleabag',
        season: '2'
      },
      {
        title: 'Broad City',
        season: '4'
      }
    ];

    const tvShowsQueryResult = await query({
      query: tvShowsQuery,
      variables: {
        input: testTVShows
      }
    });

    const { tvshows: tvShows } = tvShowsQueryResult.data;

    tvShows.forEach((tvShow, index) => {
      tvShow.title.should.equal(testTVShows[index].title);
      tvShow.season.should.equal(testTVShows[index].season);
      tvShow.criticScore.should.be.a('number');
    });
  });
});
