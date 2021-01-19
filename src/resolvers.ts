import { getInfo } from './actions/get-info';
import { setUrl } from './helpers/helpers';
import { isGamePlatformValid } from './helpers/validation';
import { MediaType } from './types/enums';
import {
  QueryAlbumInput,
  QueryAlbumsInput,
  QueryGameInput,
  QueryGamesInput,
  QueryMovieInput,
  QueryMoviesInput,
  QueryTVShowInput,
  QueryTVShowsInput
} from './types/inputs';

export const resolvers = {
  Query: {
    game: (_, { input }: QueryGameInput, { db }) => {
      const type = MediaType.Game;
      const url = setUrl(type, input);

      const isPlatformValid = isGamePlatformValid(input.platform);

      if (!isPlatformValid) {
        throw new Error(`${input.platform} is not valid for ${input.title}.`);
      }

      return getInfo(url, db, input, type);
    },
    games: async (_, { input }: QueryGamesInput, { db }) => 
      const type = MediaType.Game;

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
    album: (_, { input }: QueryAlbumInput, { db }) => {
      const type = MediaType.Album;
      const url = setUrl(type, input);

      return getInfo(url, db, input, type);
    },
    albums: async (_, { input }: QueryAlbumsInput, { db }) => {
      const type = MediaType.Album;
      return Promise.all(
        input.map((album) => getInfo(setUrl(type, album), db, album, type))
      );
    },
    movie: (_, { input }: QueryMovieInput, { db }) => {
      const type = MediaType.Movie;
      const urls = setUrl(type, input);

      return getInfo(urls, db, input, type);
    },
    movies: async (_, { input }: QueryMoviesInput, { db }) => {
      const type = MediaType.Movie;
      return Promise.all(
        input.map((movie) => getInfo(setUrl(type, movie), db, movie, type))
      );
    },
    tvshow: (_, { input }: QueryTVShowInput, { db }) => {
      const type = MediaType.TVShow;
      const url = setUrl(type, input);

      return getInfo(url, db, input, type);
    },
    tvshows: async (_, { input }: QueryTVShowsInput, { db }) => {
      const type = MediaType.TVShow;
      return Promise.all(
        input.map((tvshow) => getInfo(setUrl(type, tvshow), db, tvshow, type))
      );
    }
  }
};
