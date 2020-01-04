const https = require('https');
const cheerio = require('cheerio');

module.exports = function getAlbumInfo({artist, album}) {
    return new Promise((resolve, reject) => {
        const metaAlbum = album.replace(/:|'|!|"|¿/g, '');
        const url = `https://www.metacritic.com/music/${metaAlbum.split(' ').join('-').toLowerCase()}/${artist.split(' ').join('-').toLowerCase()}`;

        https.get(url, (res) => {
            let html = '';

            res.on('data', (chunk) => {
                html += chunk;
            });

            res.on('end', () => {
                const $ = cheerio.load(html);
                const criticScore = parseInt($('.metascore_w.album > span').text());
                const genres = $('.product_genre > .data');
                const developer = $('.developer > .data').text().trim();
                const publisher = $('.publisher > .data > a');
                const numOfEachReview = $('.total > .count');
                const reviewCount = [];
                const newGenres = [];
                const publishers = [];
            
                for (let i = 0; i < numOfEachReview.length; i++) {
                    reviewCount.push(parseInt(numOfEachReview[i].children[0].data.replace(',', '')));
                }

                for (let i = 0; i < genres.length; i++) {
                    newGenres.push(genres[i].children[0].data);
                }

                for (let i = 0; i < publisher.length; i++) {
                    publishers.push(publisher[i].children[0].data.trim());
                }

                resolve({
                    artist: artist,
                    album: album,
                    criticScore,
                    developer,
                    publisher: publishers.join(', '),
                    genres: newGenres.join(', '),
                    numOfCriticReviews: reviewCount[0] + reviewCount[1] + reviewCount[2],
                    numOfPositiveCriticReviews: reviewCount[0],
                    numOfMixedCriticReviews: reviewCount[1],
                    numOfNegativeCriticReviews: reviewCount[2]
                });
            });
        });
    });
};