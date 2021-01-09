const { query } = require('../../index');
const { gql } = require('apollo-server-lambda');
const { should } = require('chai');

should();

describe('Games', () => {
  it('should successfully retrieve information on multiple games', async () => {
    const gamesQuery = gql`
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
        platform: 'Switch'
      },
      {
        title: 'Outer Wilds',
        platform: 'Xbox One'
      },
      {
        title: 'Death Stranding',
        platform: 'PlayStation 4'
      },
      {
        title: 'Disco Elysium',
        platform: 'PC'
      },
      {
        title: 'Sayonara Wild Hearts',
        platform: 'iOS'
      },
      {
        title: 'GYLT',
        platform: 'Stadia'
      },
      {
        title: `Demon's Souls`,
        platform: 'PlayStation 5',
      },
      {
        title: 'Call of the Sea',
        platform: 'Xbox Series X'
      }
    ];
    
    const gamesQueryResult = await query({
      query: gamesQuery,
      variables: {
        input: testGames
      }
    });

    const { games } = gamesQueryResult.data;

    games.forEach((game, index) => {
      game.title.should.equal(testGames[index].title);
      game.platform.should.equal(testGames[index].platform);
      game.criticScore.should.be.a('number');
      game.genres.should.be.a('array');
      game.numOfCriticReviews.should.be.a('number');
      game.numOfPositiveCriticReviews.should.be.a('number');
      game.numOfMixedCriticReviews.should.be.a('number');
      game.numOfNegativeCriticReviews.should.be.a('number');
    });
  });
});
