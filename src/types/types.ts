import { Db } from 'mongodb';

export interface ShowDetails {
  season?: string;
}

export interface APIContext {
  db: Db;
}

export interface MoviePage {
  url: string;
  content: string;
}

export interface GeneralDetails {
  url: string;
  criticScore: number;
  releaseDate: string;
  genres: string[];
  numOfCriticReviews: number;
  numOfPositiveCriticReviews: number;
  numOfMixedCriticReviews: number;
  numOfNegativeCriticReviews: number;
  productImage: string;
}

export interface AlbumDetails extends GeneralDetails {
  artist: string;
  album: string;
  publisher: string;
}

export interface GameDetails extends GeneralDetails {
  title: string;
  platform: string;
  publisher: string[];
  developer: string;
}

export interface MovieDetails extends GeneralDetails {
  title: string;
  year: string;
  director: string[];
  runtime: string;
  cast: string[];
  summary: string;
  rating: string;
}

export interface TVShowDetails extends GeneralDetails {
  title: string;
  season: string;
  summary: string;
}
