const { query } = require('../../index');
const { gql } = require('apollo-server-express');
const { should } = require('chai');

should();

describe('Game', () => {
  it('should retrieve the information of a game when a title and console are received', async () => {
    const gameQuery = gql`
      query($input: Game!) {
        game(input: $input) {
          title
          platform
          criticScore
          developer
          publisher
          genres
          numOfCriticReviews
          numOfPositiveCriticReviews
          numOfMixedCriticReviews
          numOfNegativeCriticReviews
        }
      }
    `;

    const gameQueryResult = await query({
      query: gameQuery,
      variables: {
        input: {
          title: 'Gears 5',
          platform: 'xbox one'
        }
      }
    });

    const { game } = gameQueryResult.data;

    game.title.should.equal('Gears 5');
    game.platform.should.equal('Xbox One');
    game.criticScore.should.be.a('number');
    game.developer.should.equal('The Coalition');
    game.publisher[0].should.equal('Microsoft Game Studios');
    game.publisher[1].should.equal('Xbox Game Studios');
    game.genres.should.be.a('array');
    game.numOfCriticReviews.should.be.a('number');
    game.numOfPositiveCriticReviews.should.be.a('number');
    game.numOfMixedCriticReviews.should.be.a('number');
    game.numOfNegativeCriticReviews.should.be.a('number');
  });

  it('should retrieve the information for a game with a weird title', async () => {
    const gameQuery = gql`
      query($input: Game!) {
        game(input: $input) {
          title
          platform
          criticScore
          developer
          publisher
          genres
        }
      }
    `;

    const gameQueryResult = await query({
      query: gameQuery,
      variables: {
        input: {
          title:
            'Dragon Quest XI S: Echoes of an Elusive Age - Definitive Edition',
          platform: 'switch'
        }
      }
    });

    const { game } = gameQueryResult.data;

    game.title.should.equal(
      'Dragon Quest XI S: Echoes of an Elusive Age - Definitive Edition'
    );
    game.platform.should.equal('Switch');
    game.criticScore.should.be.a('number');
    game.developer.should.equal('Square Enix');
    game.publisher[0].should.equal('Square Enix');
    game.publisher[1].should.equal('Nintendo');
    game.genres.should.be.a('array');
  });
});
