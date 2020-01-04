const https = require('https');
const cheerio = require('cheerio');

module.exports = function getMovieInfo({ title }) {
    return new Promise((resolve, reject) => {
        const metaTitle = title.replace(/:|'|!|"|¿/g, '');
        const url = `https://www.metacritic.com/movie/${metaTitle.split(' ').join('-').toLowerCase()}`;

        https.get(url, (res) => {
            let html = '';

            res.on('data', (chunk) => {
                html += chunk;
            });

            res.on('end', () => {
                const $ = cheerio.load(html);
                const genres = $('.genres span:last-child');
                const numOfEachReview = $('.count.fr');
                const reviewCount = [];

                for (let i = 0; i < numOfEachReview.length; i++) {
                    reviewCount.push(parseInt(numOfEachReview[i].children[0].data.replace(',', '')));
                }

                resolve({
                    title: title,
                    criticScore: parseInt($('.metascore_w.larger.movie').text().substr(0 , 2)),
                    director: $('.director > a').text(),
                    runtime: $('.runtime span:last-child').text(),
                    rating: $('.rating span:last-child').text().trim(),
                    cast: $('.summary_cast span:last-child').text().trim(),
                    genres: genres.text().trim(),
                    summary: $('.summary_deck span:last-child').text().trim(),
                    numOfCriticReviews: reviewCount[0] + reviewCount[1] + reviewCount[2],
                    numOfPositiveCriticReviews: reviewCount[0],
                    numOfMixedCriticReviews: reviewCount[1],
                    numOfNegativeCriticReviews: reviewCount[2]
                });
            });
        });
    })
}