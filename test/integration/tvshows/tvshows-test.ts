import { should } from 'chai';
import { post } from '../../../src/helpers/request';
import { API_URL } from '../config';

should();

describe('TV Shows', () => {
  it('should successfully retrieve information on multiple TV Shows', async () => {
    const tvShowsQuery = `
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
        title: 'Game of Thrones',
        season: '1',
      },
      {
        title: 'Breaking Bad',
        season: '2',
      },
      {
        title: 'Hannibal',
        season: '3',
      },
      {
        title: 'Fleabag',
        season: '2',
      },
      {
        title: 'Broad City',
        season: '4',
      },
    ];

    const tvShowsQueryResult = await post(API_URL, {
      query: tvShowsQuery,
      variables: {
        input: testTVShows,
      },
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
