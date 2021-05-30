import { should } from 'chai';
import { post } from '../../../src/helpers/request';
import { API_URL } from '../config';

should();

describe('Game', () => {
  it('should retrieve the information of a game when a title and console are received', async () => {
    const gameQuery = `
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

    const gameQueryResult = await post(API_URL, {
      query: gameQuery,
      variables: {
        input: {
          title: 'Gears 5',
          platform: 'XBONE'
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
    const gameQuery = `
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

    const gameQueryResult = await post(API_URL, {
      query: gameQuery,
      variables: {
        input: {
          title:
            'Dragon Quest XI S: Echoes of an Elusive Age - Definitive Edition',
          platform: 'SWITCH'
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
