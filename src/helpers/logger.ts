import { createLogger, transports } from 'winston';

export const logger = createLogger({
  level: 'info',
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});
