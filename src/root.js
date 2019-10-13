const https = require('https');
const cheerio = require('cheerio');

const getGameInfo = require('./actions/get-game-info');
const getAlbumInfo = require('./actions/get-album-info');
const getMovieInfo = require('./actions/get-movie-info');
const getTVInfo = require('./actions/get-tv-info');

module.exports = {
    Query: {
        game: (_, { input }) => {
            return getGameInfo(input);
        },
        games: async (_, { input } ) => {
            const metaGames = [];

            for (const game of input) {
                metaGames.push(await getGameInfo(game));
            }

            return metaGames;
        },
        album: (_, { input } ) => {
           return getAlbumInfo(input);
        },
        albums: async (_, { input } ) => {
            const metaAlbums = [];

            for (const album of input) {
                metaAlbums.push(await getAlbumInfo(album));
            }

            return metaAlbums;
        },
        movie: (_, { input }) => {
            return getMovieInfo(input);
        },
        movies: async (_, { input }) => {
            const metaMovies = [];

            for (const movie of input) {
                metaMovies.push(await getMovieInfo(movie));
            }

            return metaMovies;
        },
        tv: (_, { input }) => {
            return getTVInfo(input);
        },
        tvshows: async (_, { input }) => {
            const metaShows = [];

            for (const show of input) {
                metaShows.push(await getTVInfo(show));
            }

            return metaShows;
        }
    }  
};