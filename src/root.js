const getInfo = require('./actions/get-info');
const { setUrl } = require('./helpers/helpers');

module.exports = {
  Query: {
    game: (_, { input }) => {
      const type = 'game';
      const url = setUrl(type, input);

      return getInfo(url, input, type);
    },
    games: async (_, { input }) => {
      const type = 'game';
      return Promise.all(
        input.map(game => getInfo(setUrl(type, game), game, type))
      );
    },
    album: (_, { input }) => {
      const type = 'album';
      const url = setUrl(type, input);

      return getInfo(url, input, type);
    },
    albums: async (_, { input }) => {
      const type = 'album';
      return Promise.all(
        input.map(album => getInfo(setUrl(type, album), album, type))
      );
    },
    movie: (_, { input }) => {
      const type = 'movie';
      const url = setUrl(type, input);

      return getInfo(url, input, type);
    },
    movies: async (_, { input }) => {
      const type = 'movie';
      return Promise.all(
        input.map(movie => getInfo(setUrl(type, movie), movie, type))
      );
    },
    tvshow: (_, { input }) => {
      const type = 'tvshow';
      const url = setUrl(type, input);

      return getInfo(url, input, type);
    },
    tvshows: async (_, { input }) => {
      const type = 'tvshow';
      return Promise.all(
        input.map(tvshow => getInfo(setUrl(type, tvshow), tvshow, type))
      );
    }
  }
};
