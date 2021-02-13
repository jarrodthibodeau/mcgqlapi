import { differenceInDays } from 'date-fns';
import {
  MoviePage,
  MediaType,
  AlbumInput,
  GameInput,
  MovieInput,
  TVShowInput
} from '../types';
import { load } from 'cheerio';

const BASE_URL = 'https://www.metacritic.com';

export function isTitleSafeToSave(titleReleaseDate: string) {
  const daysSinceRelease = differenceInDays(
    Date.now(),
    new Date(titleReleaseDate)
  );
  const daysTilSaveToDb = Number(process.env.DAYS_TIL_SAVE_TO_DB) || 30;

  return daysSinceRelease >= daysTilSaveToDb;
}

export function stripTitle(title: string) {
  return title.replace(/:|'|!|"|¿|\?|,/g, '');
}

export function setUrl(
  input: AlbumInput | GameInput | MovieInput | TVShowInput
): string | string[] {
  switch (input.type) {
    case MediaType.Album:
      const { album, artist } = input;

      return `${BASE_URL}/music/${stripTitle(album)
        .split(' ')
        .join('-')
        .toLowerCase()}/${artist.split(' ').join('-').toLowerCase()}`;
    case MediaType.Game:
      const { platform, title: gameTitle } = input;

      return `${BASE_URL}/game/${platform
        .split(' ')
        .join('-')
        .toLowerCase()}/${stripTitle(gameTitle)
        .split(' ')
        .join('-')
        .toLowerCase()}`;
    case MediaType.Movie:
      const { title, year } = input;
      const movieTitles = [title, `${title} ${year}`];

      return movieTitles.map(
        (movieTitle) =>
          `${BASE_URL}/movie/${stripTitle(movieTitle)
            .split(' ')
            .join('-')
            .toLowerCase()}`
      );
    case MediaType.TVShow:
      const { title: showTitle, season } = input;
      const tvShowUrl = `${BASE_URL}/tv/${stripTitle(showTitle)
        .split(' ')
        .join('-')
        .toLowerCase()}`;

      return season
        ? tvShowUrl + `/season-${season.replace('.', '-')}`
        : tvShowUrl;
  }
}

export function determineMoviePage(pages: MoviePage[], releaseYear: string) {
  const $$ = [load(pages[0].content), load(pages[1].content)];

  for (let i = 0; i < $$.length; i++) {
    if ($$[i]('.release_year').text() === releaseYear) {
      return { ...pages[i], parsedContent: $$[i] };
    }
  }
}
