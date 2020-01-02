const https = require('https');
const cheerio = require('cheerio');

module.exports = function getGameInfo({ title, console }) {
    return new Promise((resolve, reject) => {
        const metaTitle = title.replace(/:|'|!|"|¿/g, '');

        const url = `https://www.metacritic.com/game/${console.split(' ').join('-').toLowerCase()}/${metaTitle.split(' ').join('-').toLowerCase()}`;

        https.get(url, (res) => {
            let html = '';

            res.on('data', (chunk) => {
                html += chunk;
            });

            res.on('end', () => {
                const $ = cheerio.load(html);
                const criticScore = parseInt($('.metascore_w.game > span').text());
                const genres = $('.product_genre > .data');
                const userScore = parseFloat($('.metascore_w.user').text()).toFixed(1);
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
                    title: title,
                    console: console,
                    criticScore,
                    userScore,
                    developer,
                    publisher: publishers.join(', '),
                    genres: newGenres.join(', '),
                    numOfCriticReviews: reviewCount[0] + reviewCount[1] + reviewCount[2],
                    numOfPositiveCriticReviews: reviewCount[0],
                    numOfMixedCriticReviews: reviewCount[1],
                    numOfNegativeCriticReviews: reviewCount[2],
                    numOfWrittenUserReviews: reviewCount[3] + reviewCount[4] + reviewCount[5],
                    numOfWrittenPositiveUserReviews: reviewCount[3],
                    numOfWrittenMixedUserReviews: reviewCount[4],
                    numOfWrittenNegativeUserReviews: reviewCount[5]
                });
            });
        });
    });
};