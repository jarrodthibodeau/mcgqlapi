import fetch from 'node-fetch';
import { logger } from '../helpers';
import { Request } from 'apollo-server-micro';

export async function get(url: string, attemptNumber = 1): Promise<string> {
  try {
    const response = await fetch(url);
    return response.text();
  } catch (err) {
    logger.warn(`Attempt #${attemptNumber} failed. Reason: `, err);

    if (attemptNumber === 3) {
      throw new Error('Attempt to get information failed');
    }

    return get(url, (attemptNumber += 1));
  }
}

export async function post(url: string, payload: Request) {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' }
  });
  return response.json();
}
