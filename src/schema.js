const { gql } = require('apollo-server');

module.exports = gql`
    type Query {
        game(input: Game!): GameInfo,
        games(input: [Game!]): [GameInfo],
        album(input: Album!): AlbumInfo,
        albums(input: [Album!]): [AlbumInfo]
        movie(input: Movie!): MovieInfo,
        movies(input: [Movie!]): [MovieInfo],
        tv(input: TVShow!): TVShowInfo,
        tvshows(input: [TVShow!]): [TVShowInfo],
        person(inpupt: [Person!]) PersonInfo,
        company(input: Company): CompanyInfo!
    }

    type GameInfo {
        title: String,
        console: String,
        criticScore: Int,
        userScore: Float,
        developer: String,
        publisher: String,
        genres: String,
        numOfCriticReviews: Int,
        numOfPositiveCriticReviews: Int,
        numOfMixedCriticReviews: Int
        numOfNegativeCriticReviews: Int,
        numOfWrittenUserReviews: Int,
        numOfWrittenPositiveUserReviews: Int,
        numOfWrittenMixedUserReviews: Int,
        numOfWrittenNegativeUserReviews: Int
    }

    input Game {
        title: String!,
        console: String!
    }

    type AlbumInfo {
        album: String,
        artist: String,
        criticScore: Int,
        userScore: Float,
        developer: String,
        publisher: String,
        genres: String,
        numOfCriticReviews: Int,
        numOfPositiveCriticReviews: Int,
        numOfMixedCriticReviews: Int
        numOfNegativeCriticReviews: Int,
        numOfUserReviews: Int,
        numOfPositiveUserReviews: Int,
        numOfMixedUserReviews: Int,
        numOfNegativeUserReviews: Int
    }

    input Album {
        artist: String!,
        album: String!
    }

    type MovieInfo {
        title: String,
        criticScore: Int,
        userScore: Float,
        director: String,
        genres: String,
        cast: String,
        rating: String,
        runtime: String,
        summary: String,
        numOfCriticReviews: Int,
        numOfPositiveCriticReviews: Int,
        numOfMixedCriticReviews: Int
        numOfNegativeCriticReviews: Int,
        numOfWrittenUserReviews: Int,
        numOfWrittenPositiveUserReviews: Int,
        numOfWrittenMixedUserReviews: Int,
        numOfWrittenNegativeUserReviews: Int
    }

    input Movie {
        title: String!
    }

    type TVShowInfo {
        title: String,
        season: String,
        criticScore: Int,
        userScore: Float,
        genres: String,
        summary: String,
        numOfCriticReviews: Int,
        numOfPositiveCriticReviews: Int,
        numOfMixedCriticReviews: Int
        numOfNegativeCriticReviews: Int,
        numOfWrittenUserReviews: Int,
        numOfWrittenPositiveUserReviews: Int,
        numOfWrittenMixedUserReviews: Int,
        numOfWrittenNegativeUserReviews: Int
    }

    input TVShow {
        title: String!,
        season: String,
    }

    // type PersonInfo {
    //     name: String,
    //     bio: String,
    //     averageCareerScore: Int,
    //     numOfPositiveProjects: Int,
    //     numOfAverageProjects: Int
    //     numOfNegativeProjects, Int,
    //     highestRatedProject: String,
    //     lowestRatedProject: String
    // }

    // input Person {
    //     name: String!,
    //     mediaType: String
    // }

    // type CompanyInfo {
    //     name: String
    //     averageCareerScore: Int,
    //     numOfPositiveProjects: Int,
    //     numOfAverageProjects: Int
    //     numOfNegativeProjects, Int,
    //     highestRatedProject: String,
    //     lowestRatedProject: String
    // }

    // input Company {
    //     name: String!,
    //     mediaType: String
    // }
`;