const { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    game(input: Game!): GameInfo
    games(input: [Game!]): [GameInfo]
    album(input: Album!): AlbumInfo
    albums(input: [Album!]): [AlbumInfo]
    movie(input: Movie!): MovieInfo
    movies(input: [Movie!]): [MovieInfo]
    tvshow(input: TVShow!): TVShowInfo
    tvshows(input: [TVShow!]): [TVShowInfo]
  }

  type GameInfo {
    title: String
    console: String
    criticScore: Int
    developer: String
    publisher: String
    genres: [String]
    numOfCriticReviews: Int
    numOfPositiveCriticReviews: Int
    numOfMixedCriticReviews: Int
    numOfNegativeCriticReviews: Int
  }

  input Game {
    title: String!
    console: String!
  }

  type AlbumInfo {
    album: String
    artist: String
    criticScore: Int
    developer: String
    publisher: String
    genres: [String]
    numOfCriticReviews: Int
    numOfPositiveCriticReviews: Int
    numOfMixedCriticReviews: Int
    numOfNegativeCriticReviews: Int
  }

  input Album {
    artist: String!
    album: String!
  }

  type MovieInfo {
    title: String
    criticScore: Int
    director: String
    genres: [String]
    cast: [String]
    rating: String
    runtime: String
    summary: String
    numOfCriticReviews: Int
    numOfPositiveCriticReviews: Int
    numOfMixedCriticReviews: Int
    numOfNegativeCriticReviews: Int
  }

  input Movie {
    title: String!
  }

  type TVShowInfo {
    title: String
    season: String
    criticScore: Int
    genres: [String]
    summary: String
    numOfCriticReviews: Int
    numOfPositiveCriticReviews: Int
    numOfMixedCriticReviews: Int
    numOfNegativeCriticReviews: Int
  }

  input TVShow {
    title: String!
    season: String
  }
`;
