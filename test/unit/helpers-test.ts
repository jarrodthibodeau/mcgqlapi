import { should } from 'chai';
import {
  isTitleSafeToSave,
  setUrl,
  stripTitle,
} from '../../src/helpers/helpers';

should();

describe('Helpers', () => {
  describe('isTitleSafeToSave', () => {
    context(
      'Passing in a date that does not meet the save to db threshold',
      () => {
        const result = isTitleSafeToSave(new Date());

        it('result should equal false', () => {
          result.should.equal(false);
        });
      }
    );

    context('Passing in a date that does meet the save to db threshold', () => {
      const result = isTitleSafeToSave('03-02-2019');

      it('result should equal true', () => {
        result.should.equal(true);
      });
    });
  });

  describe('stripTitle', () => {
    context('Stripping characters of a complicated title', () => {
      const strippedTitle = stripTitle(
        'DRAGON QUEST XI S: ECHOES OF AN ELUSIVE AGE - DEFINITIVE EDITION'
      );

      it('should return the properly stripped title for a metacritic url', () => {
        const expectedTitle =
          'DRAGON QUEST XI S ECHOES OF AN ELUSIVE AGE - DEFINITIVE EDITION';
        strippedTitle.should.equal(expectedTitle);
      });
    });
  });

  describe('setUrl', () => {
    const MC_URL = 'https://www.metacritic.com';

    context('Properly setting url for a album', () => {
      const albumUrl = setUrl('album', {
        artist: 'Billie Eilish',
        album: 'When We All Fall Asleep, Where do we go?',
      });

      it('should properly format a valid metacritic album URL', () => {
        const expectedUrl = `${MC_URL}/music/when-we-all-fall-asleep-where-do-we-go/billie-eilish`;
        albumUrl.should.equal(expectedUrl);
      });
    });

    context('Properly setting a url for a game', () => {
      const gameUrl = setUrl('game', {
        title: 'Castlevania: Symphony of the Night',
        platform: 'playstation',
      });

      it('should properly format a valid metacritic game URL', () => {
        const expectedUrl = `${MC_URL}/game/playstation/castlevania-symphony-of-the-night`;
        gameUrl.should.equal(expectedUrl);
      });
    });

    context('Properly setting the urls for a movie', () => {
      const movieUrls = setUrl('movie', {
        title: 'Oldboy',
        year: '2005',
      });

      it('should return two valid metacritic urls for the movie with and without year', () => {
        const expectedUrls = [
          `${MC_URL}/movie/oldboy`,
          `${MC_URL}/movie/oldboy-2005`,
        ];

        movieUrls[0].should.equal(expectedUrls[0]);
        movieUrls[1].should.equal(expectedUrls[1]);
        movieUrls.should.be.an('array');
      });
    });

    context('Properly setting the url for a tv with a season', () => {
      const tvShowUrl = setUrl('tvshow', {
        title: 'Twin Peaks',
        season: '1',
      });

      it('should properly format a valid metacritic url for a tvshow with season', () => {
        const expectedUrl = `${MC_URL}/tv/twin-peaks/season-1`;
        tvShowUrl.should.equal(expectedUrl);
      });
    });

    context('Properly setting the url for a tv show without a season', () => {
      const tvShowUrl = setUrl('tvshow', {
        title: 'Futurama',
      });

      it('should properly format a valid metacritic url for a tvshow without a season', () => {
        const expectedUrl = `${MC_URL}/tv/futurama`;
        tvShowUrl.should.equal(expectedUrl);
      });
    });
  });
});
