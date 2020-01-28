const { differenceInDays } = require('date-fns');

const BASE_URL = 'https://www.metacritic.com';

function isTitleSafeToSave(titleReleaseDate) {
  const daysSinceRelease = differenceInDays(
    Date.now(),
    new Date(titleReleaseDate)
  );
  return daysSinceRelease >= process.env.DAYS_TIL_SAVE_TO_DB;
}

function stripTitle(title) {
  return title.replace(/:|'|!|"|¿/g, '');
}

function setUrl(type, input) {
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
      const movieTitle = year ? `${title} ${year}` : title;

      return `${BASE_URL}/movie/${stripTitle(movieTitle)
        .split(' ')
        .join('-')
        .toLowerCase()}`;
    case 'tvshow':
      const { title: showTitle, season } = input;
      const tvShowUrl = `${BASE_URL}/tv/${stripTitle(showTitle)
        .split(' ')
        .join('-')
        .toLowerCase()}/`;

      return season ? tvShowUrl + `season-${season}` : tvShowUrl
  }
}

module.exports = {
  isTitleSafeToSave,
  stripTitle,
  setUrl
};
