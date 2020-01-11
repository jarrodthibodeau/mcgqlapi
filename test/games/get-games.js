const { query } = require('../index');
const { gql } = require('apollo-server');
const { should } = require('chai');

should();

describe('Games', () => {
  it('should successfully retrieve information on multiple games', async () => {
    const gamesQuery = gql`
      query($input: [Game!]) {
        games(input: $input) {
          title
          console
          criticScore
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
        console: 'Switch'
      },
      {
        title: 'Outer Wilds',
        console: 'Xbox One'
      },
      {
        title: 'Death Stranding',
        console: 'PlayStation 4'
      },
      {
        title: 'Disco Elysium',
        console: 'PC'
      },
      {
        title: 'Sayonara Wild Hearts',
        console: 'iOS'
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
      game.console.should.equal(testGames[index].console);
      game.criticScore.should.be.a('number');
      game.numOfCriticReviews.should.be.a('number');
      game.numOfPositiveCriticReviews.should.be.a('number');
      game.numOfMixedCriticReviews.should.be.a('number');
      game.numOfNegativeCriticReviews.should.be.a('number');
    });
  });
});
