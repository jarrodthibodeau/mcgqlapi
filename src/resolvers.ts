import { getInfo } from './actions/get-info';
import { setUrl } from './helpers/helpers';
import { isGamePlatformValid } from './helpers/validation';

export const resolvers = {
  Query: {
    game: (_, { input }, { db }) => {
      const type = 'game';
      const url = setUrl(type, input);

      const isPlatformValid = isGamePlatformValid(input.platform);

      if (!isPlatformValid) {
        throw new Error(`${input.platform} is not valid for ${input.title}.`);
      }

      return getInfo(url, db, input, type);
    },
    games: async (_, { input }, { db }) => {
      const type = 'game';

      input.forEach((game) => {
        const isPlatformValid = isGamePlatformValid(game.platform);

        if (!isPlatformValid) {
          throw new Error(`${game.platform} is not valid for ${game.title}.`);
        }
      });

      return Promise.all(
        input.map((game) => getInfo(setUrl(type, game), db, game, type))
      );
    },
    album: (_, { input }, { db }) => {
      const type = 'album';
      const url = setUrl(type, input);

      return getInfo(url, db, input, type);
    },
    albums: async (_, { input }, { db }) => {
      const type = 'album';
      return Promise.all(
        input.map((album) => getInfo(setUrl(type, album), db, album, type))
      );
    },
    movie: (_, { input }, { db }) => {
      const type = 'movie';
      const urls = setUrl(type, input);

      return getInfo(urls, db, input, type);
    },
    movies: async (_, { input }, { db }) => {
      const type = 'movie';
      return Promise.all(
        input.map((movie) => getInfo(setUrl(type, movie), db, movie, type))
      );
    },
    tvshow: (_, { input }, { db }) => {
      const type = 'tvshow';
      const url = setUrl(type, input);

      return getInfo(url, db, input, type);
    },
    tvshows: async (_, { input }, { db }) => {
      const type = 'tvshow';
      return Promise.all(
        input.map((tvshow) => getInfo(setUrl(type, tvshow), db, tvshow, type))
      );
    },
  },
};
