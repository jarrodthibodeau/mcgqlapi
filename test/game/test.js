const { query } = require('../index');
const { gql } = require('apollo-server');
const { should } = require('chai');

should();

describe('Game', () => {
    it ('should retrieve the information of a game when a title and console are received', async () => {
        const gameQuery = gql`
            query($input: Game!) {
                game(input: $input) {
                    title,
                    console,
                    criticScore,
                    userScore,
                    developer,
                    publisher,
                    genres,
                    numOfCriticReviews,
                    numOfPositiveCriticReviews,
                    numOfMixedCriticReviews,
                    numOfNegativeCriticReviews,
                    numOfWrittenUserReviews,
                    numOfWrittenPositiveUserReviews,
                    numOfWrittenMixedUserReviews,
                    numOfWrittenNegativeUserReviews
                }
            }
        `;

        const gameQueryResult = await query({
            query: gameQuery,
            variables: {
                input: {
                    title: 'Gears 5',
                    console: 'Xbox One'
                }
            }
        });

        const {
            game
        } = gameQueryResult.data;


        game.title.should.equal('Gears 5');
        game.console.should.equal('Xbox One');
        game.criticScore.should.be.a('number');
        game.userScore.should.be.a('number');
        game.developer.should.equal('The Coalition');
        game.publisher.should.equal('Microsoft Game Studios, Xbox Game Studios');
        game.genres.should.equal('Action, Shooter, Third-Person, Arcade'); 
        game.numOfCriticReviews.should.be.a('number');
        game.numOfPositiveCriticReviews.should.be.a('number');
        game.numOfMixedCriticReviews.should.be.a('number');
        game.numOfNegativeCriticReviews.should.be.a('number');
        game.numOfWrittenUserReviews.should.be.a('number');
        game.numOfWrittenPositiveUserReviews.should.be.a('number');
        game.numOfWrittenMixedUserReviews.should.be.a('number');
        game.numOfWrittenNegativeUserReviews.should.be.a('number');
    });

    it ('should retrieve the information for a game with a weird title', async () => {
        const gameQuery = gql`
        query($input: Game!) {
                game(input: $input) {
                    title,
                    console,
                    criticScore,
                    userScore,
                    developer,
                    publisher,
                    genres
                }
            }
        `;

        const gameQueryResult = await query({
            query: gameQuery,
            variables: {
                input: {
                    title: 'Dragon Quest XI S: Echoes of an Elusive Age - Definitive Edition',
                    console: 'Switch'
                }
            }
        });

        const {
            game
        } = gameQueryResult.data;


        game.title.should.equal('Dragon Quest XI S: Echoes of an Elusive Age - Definitive Edition');
        game.console.should.equal('Switch');
        game.criticScore.should.be.a('number');
        game.userScore.should.be.a('number');
        game.developer.should.equal('Square Enix');
        game.publisher.should.equal('Square Enix, Nintendo');
        game.genres.should.equal('Role-Playing, Japanese-Style');
    });
});