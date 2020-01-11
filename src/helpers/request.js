const fetch = require('node-fetch');

async function get(url, attemptNumber = 1) {
  try {
    const response = await fetch(url);
    return response.text();
  } catch (err) {
    console.warn(`Attempt #${attemptNumber} failed. Reason: `, err);

    if (attemptNumber === 3) {
      throw new Error('Attempt to get information failed');
    }

    return get(url, attemptNumber += 1);
  }
}

module.exports = {
  get
};
