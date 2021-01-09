import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Query {
    """
    Retrieves a single game based on title and platform
    """
    game(input: Game!): GameInfo
    """
    Retrieves a list of games based on titles and platforms
    """
    games(input: [Game!]): [GameInfo]
    """
    Retrieves a single album based on the title of the album and artist
    """
    album(input: Album!): AlbumInfo
    """
    Retrieves a list of albums based on the titles of the albums and artists
    """
    albums(input: [Album!]): [AlbumInfo]
    """
    Retrieves a movie based on the title and year it was released
    """
    movie(input: Movie!): MovieInfo
    """
    Retrieves a list of movies based on the titles and years they were released
    """
    movies(input: [Movie!]): [MovieInfo]
    """
    Retrieve a TV show based on the title and season (if none, it gets an overview of the series as a whole)
    """
    tvshow(input: TVShow!): TVShowInfo
    """
    Retrieves a list of TV shows based on the titles and seasons
    """
    tvshows(input: [TVShow!]): [TVShowInfo]
  }

  type GameInfo {
    """
    The Metacritic URL for the game
    """
    url: String!
    """
    The title of the game
    """
    title: String!
    """
    The platform the game is on
    """
    platform: String!
    """
    The game's Metacritic score from critics.
    """
    criticScore: Int!
    """
    The release date of the game
    """
    releaseDate: String!
    """
    The developer of the game
    """
    developer: String!
    """
    The publisher/s of the game
    """
    publisher: [String!]
    """
    The genres of the game
    """
    genres: [String!]
    """
    The number of critic reviews on the game
    """
    numOfCriticReviews: Int!
    """
    The number of critic reviews on the game that are deemed positive
    """
    numOfPositiveCriticReviews: Int!
    """
    The number of critic reviews on the game that are deemed mixed
    """
    numOfMixedCriticReviews: Int!
    """
    The number of critic reviews on the game that are deemed negative
    """
    numOfNegativeCriticReviews: Int!
    """
    URL that links to the image used for the game on Metacritic
    """
    productImage: String!
  }

  input Game {
    """
    The title of the video game
    """
    title: String!
    """
    The platform of which the game is on.
    
    Here are the supported options
    
      - pc
      - ios
      - dreamcast
      - gameboy advance
      - ds
      - 3ds
      - nintendo 64
      - gamecube
      - wii
      - wii u
      - switch
      - playstation
      - playstation 2
      - playstation 3
      - playstation 4
      - playstation 5
      - psp
      - playstation vita
      - xbox
      - xbox 360
      - xbox one
      - xbox series x
      - stadia
    """
    platform: String!
  }

  type AlbumInfo {
    """
    The Metacritic URL for the album
    """
    url: String!
    """
    The title of the album
    """
    album: String!
    """
    The name of the artist
    """
    artist: String!
    """
    The release date of the album
    """
    releaseDate: String!
    """
    The album's Metacritic score from critics.
    """
    criticScore: Int!
    """
    The album's publisher
    """
    publisher: String!
    """
    The genre's of the album
    """
    genres: [String!]
    """
    The number of critic reviews on the album
    """
    numOfCriticReviews: Int!
    """
    The number of critic reviews on the album that are deemed positive
    """
    numOfPositiveCriticReviews: Int!
    """
    The number of critic reviews on the album that are deemed mixed
    """
    numOfMixedCriticReviews: Int!
    """
    The number of critic reviews on the album that are deemed negative
    """
    numOfNegativeCriticReviews: Int!
    """
    URL that links to the image used for the album on Metacritic
    """
    productImage: String!
  }

  input Album {
    """
    The artist who made the album
    """
    artist: String!
    """
    The title of the album
    """
    album: String!
  }

  type MovieInfo {
    """
    The Metacritic URL for the movie
    """
    url: String!
    """
    The title of the movie
    """
    title: String!
    """
    The movie's Metacritic score from critics.
    """
    criticScore: Int!
    """
    The year the movie was released
    """
    year: String!
    """
    A list of the director/s of the movie
    """
    director: [String!]
    """
    The release date of the movie
    """
    releaseDate: String!
    """
    The genres of the movie
    """
    genres: [String!]
    """
    A list of the cast of the movie
    """
    cast: [String!]
    """
    The movie's rating based on the Motion Picture Association film rating system
    """
    rating: String!
    """
    How long the movie is in minutes
    """
    runtime: String!
    """
    A brief summary of what the movie is about
    """
    summary: String!
    """
    The number of critic reviews on the movie
    """
    numOfCriticReviews: Int!
    """
    The number of critic reviews on the movie that are deemed positive
    """
    numOfPositiveCriticReviews: Int!
    """
    The number of critic reviews on the movie that are deemed mixed
    """
    numOfMixedCriticReviews: Int!
    """
    The number of critic reviews on the movie that are deemed negative
    """
    numOfNegativeCriticReviews: Int!
    """
    URL that links to the image used for the movie on Metacritic
    """
    productImage: String!
  }

  input Movie {
    """
    The title of the movie
    """
    title: String!
    """
    The year that the movie was released. 

    This is needed because there are multiple versions/remake of a film so the year is required
    """
    year: String!
  }

  type TVShowInfo {
    """
    The Metacritic URL for the TV show/series season/overview
    """
    url: String!
    """
    The title of the TV show
    """
    title: String!
    """
    The season of the TV show, if "all" then it is an overview of the series
    """
    season: String!
    """
    The TV Shows' season/overall Metacritic score from critics.
    """
    criticScore: Int!
    """
    The release date of the TV series/season
    """
    releaseDate: String!
    """
    The genres for the TV series
    """
    genres: [String!]
    """
    A brief summary of the TV show or the show's particular season
    """
    summary: String!
    """
    The number of critic reviews on the game
    """
    numOfCriticReviews: Int!
    """
    The number of critic reviews on the TV series/season that are deemed positive
    """
    numOfPositiveCriticReviews: Int!
    """
    The number of critic reviews on the TV series/season that are deemed mixed
    """
    numOfMixedCriticReviews: Int!
    """
    The number of critic reviews on the TV series/season that are deemed negative
    """
    numOfNegativeCriticReviews: Int!
    """
    URL that links to the image used for the game on Metacritic
    """
    productImage: String!
  }

  input TVShow {
    """
    The title of the TV show/series
    """
    title: String!
    """
    The particular season of the show. 
    
    If no season is provided, then an overview of the show (all seasons) will be grabbed
    """
    season: String
  }
`;
