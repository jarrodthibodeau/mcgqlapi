import {
  getAlbumInfo,
  getGameInfo,
  getMovieInfo,
  getTVShowInfo
} from './actions';
import { isGamePlatformValid, setUrl } from './helpers';
import {
  APIContext,
  MediaType,
  QueryAlbumInput,
  QueryAlbumsInput,
  QueryGameInput,
  QueryGamesInput,
  QueryMovieInput,
  QueryMoviesInput,
  QueryTVShowInput,
  QueryTVShowsInput
} from './types';

export const resolvers = {
  Query: {
    game: (_: object, { input }: QueryGameInput, { db }: APIContext) => {
      const type = MediaType.Game;
      const url = setUrl({ type, ...input });

      const isPlatformValid = isGamePlatformValid(input.platform);

      if (!isPlatformValid) {
        throw new Error(`${input.platform} is not valid for ${input.title}.`);
      }

      return getGameInfo(typeof url === 'string' ? url : null, db, {
        ...input,
        type
      });
    },
    games: async (
      _: object,
      { input }: QueryGamesInput,
      { db }: APIContext
    ) => {
      const type = MediaType.Game;

      input.forEach((game) => {
        const isPlatformValid = isGamePlatformValid(game.platform);

        if (!isPlatformValid) {
          throw new Error(`${game.platform} is not valid for ${game.title}.`);
        }
      });

      return Promise.all(
        input.map((game) => {
          const url = setUrl({ type, ...game });
          return getGameInfo(typeof url === 'string' ? url : null, db, {
            ...game,
            type
          });
        })
      );
    },
    album: (_: object, { input }: QueryAlbumInput, { db }: APIContext) => {
      const type = MediaType.Album;
      const url = setUrl({ type, ...input });

      return getAlbumInfo(typeof url === 'string' ? url : null, db, {
        ...input,
        type
      });
    },
    albums: async (
      _: object,
      { input }: QueryAlbumsInput,
      { db }: APIContext
    ) => {
      const type = MediaType.Album;
      return Promise.all(
        input.map((album) => {
          const url = setUrl({ type, ...album });
          return getAlbumInfo(typeof url === 'string' ? url : null, db, {
            ...album,
            type
          });
        })
      );
    },
    movie: (_: object, { input }: QueryMovieInput, { db }: APIContext) => {
      const type = MediaType.Movie;
      const urls = setUrl({ type, ...input });

      return getMovieInfo(urls, db, { ...input, type });
    },
    movies: async (
      _: object,
      { input }: QueryMoviesInput,
      { db }: APIContext
    ) => {
      const type = MediaType.Movie;
      return Promise.all(
        input.map((movie) =>
          getMovieInfo(setUrl({ type, ...movie }), db, { ...movie, type })
        )
      );
    },
    tvshow: (_: object, { input }: QueryTVShowInput, { db }: APIContext) => {
      const type = MediaType.TVShow;
      const url = setUrl({ type, ...input });

      return getTVShowInfo(typeof url === 'string' ? url : null, db, {
        ...input,
        type
      });
    },
    tvshows: async (
      _: object,
      { input }: QueryTVShowsInput,
      { db }: APIContext
    ) => {
      const type = MediaType.TVShow;
      return Promise.all(
        input.map((tvshow) => {
          const url = setUrl({ type, ...tvshow });
          return getTVShowInfo(typeof url === 'string' ? url : null, db, {
            ...tvshow,
            type
          });
        })
      );
    }
  }
};
