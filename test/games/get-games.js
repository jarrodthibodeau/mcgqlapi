const { query } = require('../index');
const { gql } = require('apollo-server');
const { should } = require('chai');

should();

describe('Games', () => {
    it ('should successfully retrieve information on multiple games', async () => {
        const gamesQuery = gql`
            query($input: [Game!]) {
                games(input: $input) {
                    title,
                    console,
                    criticScore,
                    userScore,
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
            game.userScore.should.be.a('number');
            game.numOfCriticReviews.should.be.a('number');
            game.numOfPositiveCriticReviews.should.be.a('number');
            game.numOfMixedCriticReviews.should.be.a('number');
            game.numOfNegativeCriticReviews.should.be.a('number');
            game.numOfWrittenUserReviews.should.be.a('number');
            game.numOfWrittenPositiveUserReviews.should.be.a('number');
            game.numOfWrittenMixedUserReviews.should.be.a('number');
            game.numOfWrittenNegativeUserReviews.should.be.a('number');
        });
    });
});
