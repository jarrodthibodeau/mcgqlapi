const { query } = require('../index');
const { gql } = require('apollo-server');
const { should } = require('chai');

should();

describe('Albums', () => {
    it ('should successfully retrieve information on multiple albums', async () => {
        const albumsQuery = gql`
            query($input: [Album!]) {
                albums(input: $input) {
                    album
                    artist
                    criticScore
                    userScore
                    numOfCriticReviews
                    numOfPositiveCriticReviews
                    numOfMixedCriticReviews
                    numOfNegativeCriticReviews
                    numOfWrittenUserReviews
                    numOfWrittenPositiveUserReviews
                    numOfWrittenMixedUserReviews
                    numOfWrittenNegativeUserReviews
                }
            }
        `;

        const testAlbums = [
            {
                artist: 'Idles',
                album: 'Joy as an act of resistance'
            },
            {
                artist: 'The 1975',
                album: 'A Brief Inquiry into online relationships'
            },
            {
                artist: 'Lizzo',
                album: 'Cuz I Love You'
            },
            {
                artist: 'Kacey Musgraves',
                album: 'Golden Hour'
            }, 
            {
                artist: 'Run The Jewels',
                album: 'Run The Jewels 3'
            }
        ];

        const albumsQueryResult = await query({
            query: albumsQuery,
            variables: {
                input: testAlbums
            }
        });

        const { albums } = albumsQueryResult.data;

        albums.forEach((album, index) => {
            album.artist.should.equal(testAlbums[index].artist);
            album.album.should.equal(testAlbums[index].album);
            album.criticScore.should.be.a('number');
            album.userScore.should.be.a('number');
            album.numOfCriticReviews.should.be.a('number');
            album.numOfPositiveCriticReviews.should.be.a('number');
            album.numOfMixedCriticReviews.should.be.a('number');
            album.numOfNegativeCriticReviews.should.be.a('number');
            album.numOfWrittenUserReviews.should.be.a('number');
            album.numOfWrittenPositiveUserReviews.should.be.a('number');
            album.numOfWrittenMixedUserReviews.should.be.a('number');
            album.numOfWrittenNegativeUserReviews.should.be.a('number');
        });
    });
});