const getGameInfo = require('./actions/get-game-info');
const getAlbumInfo = require('./actions/get-album-info');
const getMovieInfo = require('./actions/get-movie-info');
const getTVInfo = require('./actions/get-tv-info');

module.exports = {
  Query: {
    game: (_, { input }) => {
      return getGameInfo(input);
    },
    games: async (_, { input }) => {
      return Promise.all(input.map(game => getGameInfo(game)));
    },
    album: (_, { input }) => {
      return getAlbumInfo(input);
    },
    albums: async (_, { input }) => {
      return Promise.all(input.map(album => getAlbumInfo(album)));
    },
    movie: (_, { input }) => {
      return getMovieInfo(input);
    },
    movies: async (_, { input }) => {
      return Promise.all(input.map(movie => getMovieInfo(movie)));
    },
    tvshow: (_, { input }) => {
      return getTVInfo(input);
    },
    tvshows: async (_, { input }) => {
      return Promise.all(input.map(tvshow => getTVInfo(tvshow)));
    }
  }
};
