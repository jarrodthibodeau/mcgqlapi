import { differenceInDays } from 'date-fns';
import cheerio  from 'cheerio';

const BASE_URL = 'https://www.metacritic.com';

export function isTitleSafeToSave(titleReleaseDate) {
  const daysSinceRelease = differenceInDays(
    Date.now(),
    new Date(titleReleaseDate)
  );
  const daysTilSaveToDb = Number(process.env.DAYS_TIL_SAVE_TO_DB) || 30;

  return daysSinceRelease >= daysTilSaveToDb;
}

export function stripTitle(title) {
  return title.replace(/:|'|!|"|¿|\?|,/g, '');
}

export function setUrl(type, input) {
  switch (type) {
    case 'album':
      const { album, artist } = input;

      return `${BASE_URL}/music/${stripTitle(album)
        .split(' ')
        .join('-')
        .toLowerCase()}/${artist
        .split(' ')
        .join('-')
        .toLowerCase()}`;
    case 'game':
      const { platform, title: gameTitle } = input;

      return `${BASE_URL}/game/${platform
        .split(' ')
        .join('-')
        .toLowerCase()}/${stripTitle(gameTitle)
        .split(' ')
        .join('-')
        .toLowerCase()}`;
    case 'movie':
      const { title, year } = input;
      const movieTitles = [title, `${title} ${year}`];

      return movieTitles.map(movieTitle =>  `${BASE_URL}/movie/${stripTitle(movieTitle)
        .split(' ')
        .join('-')
        .toLowerCase()}`);
    case 'tvshow':
      const { title: showTitle, season } = input;
      const tvShowUrl = `${BASE_URL}/tv/${stripTitle(showTitle)
        .split(' ')
        .join('-')
        .toLowerCase()}`;

      return season ? tvShowUrl + `/season-${season.replace('.', '-')}` : tvShowUrl
  }
}

export function determineMoviePage(pages, releaseYear) {  
  const $$ = [
    cheerio.load(pages[0].content),
    cheerio.load(pages[1].content)
  ];

  for (let  i = 0; i < $$.length; i++) {
    if ($$[i]('.release_year').text() === releaseYear) {;
      return { ...pages[i], parsedContent: $$[i] };
    }
  }
}
