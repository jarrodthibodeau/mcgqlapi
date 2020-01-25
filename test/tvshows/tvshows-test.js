const { query } = require('../index');
const { gql } = require('apollo-server-express');
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
          genres
        }
      }
    `;

    const testTVShows = [
      {
        title: 'Game of Thrones: Season 1',
        season: '1'
      },
      {
        title: 'Breaking Bad: Season 2',
        season: '2'
      },
      {
        title: 'Hannibal: Season 3',
        season: '3'
      },
      {
        title: 'Fleabag: Season 2',
        season: '2'
      },
      {
        title: 'Broad City: Season 4',
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
      tvShow.genres.should.be.a('array');
    });
  });
});
