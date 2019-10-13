const https = require('https');
const cheerio = require('cheerio');

module.exports = function getTVInfo({ title, season }) {
    return new Promise((resolve, reject) => {
        const metaTitle = title.replace(/:|'|!|"|¿/g, '');
        let url = `https://www.metacritic.com/tv/${metaTitle.split(' ').join('-').toLowerCase()}`;

        if (season) {
            url += `/season-${season}`; 
        }

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
                    season: season ? season : 'all',
                    criticScore: parseInt($('.metascore_w.larger.tvshow').text().substr(0 , 2)),
                    userScore: parseFloat($('.metascore_w.larger.user').text()).toFixed(1),
                    genres: genres.text().trim(),
                    summary: $('.summary_deck span:last-child').text().trim(),
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
}