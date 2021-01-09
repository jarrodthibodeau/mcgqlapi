import { fetch } from 'node-fetch';
import { logger } from '../helpers/logger';

export async function get(url, attemptNumber = 1) {
  try {
    const response = await fetch(url);
    return response.text();
  } catch (err) {
    logger.warn(`Attempt #${attemptNumber} failed. Reason: `, err);

    if (attemptNumber === 3) {
      throw new Error('Attempt to get information failed');
    }

    return get(url, attemptNumber += 1);
  }
}