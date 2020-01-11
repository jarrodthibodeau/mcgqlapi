const { differenceInDays } = require('date-fns');

function isTitleSafeToWrite(titleReleaseDate) {
  const daysSinceRelease = differenceInDays(Date.now(), new Date(titleReleaseDate));
  return daysSinceRelease >= process.env.DAYS_TIL_WRITE_TO_DB;
}

function stripTitle(title) {
  return title.replace(/:|'|!|"|¿/g, '');
}

module.exports = {
  isTitleSafeToWrite,
  stripTitle
};
