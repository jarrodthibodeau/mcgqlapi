const { query } = require('../index');
const { gql } = require('apollo-server');
const { should } = require('chai');

should();

describe('TV Show', () => {
    it ('should retrieve information about a TV show when a show title and season is provided', async () => {
        const tvShowQuery = gql`
            query ($input: TVShow!) {
                tvshow(input: $input) {
                    title,
                    season,
                    criticScore,
                    userScore
                }
            }
        `;

        const tvShowQueryResult = await query({
            query: tvShowQuery,
            variables: {
                input: {
                    title: `Genndy Tartakovsky's Primal`,
                    season: '1'
                }
            }
        });

        const { tvshow } = tvShowQueryResult.data;

        tvshow.title.should.equal('Genndy Tartakovsky\'s Primal');
        tvshow.season.should.equal('1');
        tvshow.criticScore.should.be.a('number');
        tvshow.userScore.should.be.a('number');
    });
});