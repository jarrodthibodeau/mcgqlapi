import { should } from 'chai';
import { post } from '../../../src/helpers/request';
import { API_URL } from '../config';

should();

describe('TV Show', () => {
  it('should retrieve information about a TV show when a show title and season is provided', async () => {
    const tvShowQuery = `
      query($input: TVShow!) {
        tvshow(input: $input) {
          title
          season
          criticScore
        }
      }
    `;

    const tvShowQueryResult = await post(API_URL, {
      query: tvShowQuery,
      variables: {
        input: {
          title: `Genndy Tartakovsky's Primal`,
          season: '1'
        }
      }
    });

    const { tvshow } = tvShowQueryResult.data;

    tvshow.title.should.equal("Genndy Tartakovsky's Primal");
    tvshow.season.should.equal('1');
    tvshow.criticScore.should.be.a('number');
  });

  it('should retrieve information about a TV show whose season is a half season', async () => {
    const tvShowQuery = `
      query($input: TVShow!) {
        tvshow(input: $input) {
          title
          season
          criticScore
        }
      }
    `;

    const tvShowQueryResult = await post(API_URL, {
      query: tvShowQuery,
      variables: {
        input: {
          title: 'Bojack Horseman',
          season: '6.5'
        }
      }
    });

    const { tvshow } = tvShowQueryResult.data;

    tvshow.title.should.equal('BoJack Horseman');
    tvshow.season.should.equal('6.5');
    tvshow.criticScore.should.be.a('number');
  });

  it('should retrieve an overview of a tv season if a season is not passed in', async () => {
    const tvShowQuery = `
      query($input: TVShow!) {
        tvshow(input: $input) {
          title
          season
          criticScore
        }
      }
    `;

    const tvShowQueryResult = await post(API_URL, {
      query: tvShowQuery,
      variables: {
        input: {
          title: 'GLOW'
        }
      }
    });

    const { tvshow } = tvShowQueryResult.data;

    tvshow.title.should.equal('GLOW');
    tvshow.season.should.equal('all');
    tvshow.criticScore.should.be.a('number');
  });
});
