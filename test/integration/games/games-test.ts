import { should } from 'chai';
import { post } from '../../../src/helpers/request';
import { API_URL } from '../config';
import { GameDetails, GamePlatform } from '../../../src/types';

should();

describe('Games', () => {
  it('should successfully retrieve information on multiple games', async () => {
    const gamesQuery = `
      query($input: [Game!]) {
        games(input: $input) {
          title
          platform
          criticScore
          genres
          numOfCriticReviews
          numOfPositiveCriticReviews
          numOfMixedCriticReviews
          numOfNegativeCriticReviews
        }
      }
    `;

    const testGames = [
      {
        title: 'Ape Out',
        platform: 'SWITCH'
      },
      {
        title: 'Outer Wilds',
        platform: 'XBONE'
      },
      {
        title: 'Death Stranding',
        platform: 'PS4'
      },
      {
        title: 'Disco Elysium',
        platform: 'PC'
      },
      {
        title: 'Sayonara Wild Hearts',
        platform: 'IOS'
      },
      {
        title: 'GYLT',
        platform: 'STADIA'
      },
      {
        title: `Demon's Souls`,
        platform: 'PS5'
      },
      {
        title: 'Call of the Sea',
        platform: 'XSX'
      }
    ];

    const gamesQueryResult = await post(API_URL, {
      query: gamesQuery,
      variables: {
        input: testGames
      }
    });

    const { games } = gamesQueryResult.data;

    games.forEach((game: GameDetails, index: number) => {
      game.title.should.equal(testGames[index].title);
      game.platform.should.equal(GamePlatform[testGames[index].platform as keyof typeof GamePlatform]);
      game.criticScore.should.be.a('number');
      game.genres.should.be.a('array');
      game.numOfCriticReviews.should.be.a('number');
      game.numOfPositiveCriticReviews.should.be.a('number');
      game.numOfMixedCriticReviews.should.be.a('number');
      game.numOfNegativeCriticReviews.should.be.a('number');
    });
  });
});
