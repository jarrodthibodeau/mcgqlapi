export type MediaInput = {
  title: string;
}

//TODO: Add PlatformEnum here
export type GameInput = MediaInput & {
  platform: string
}

export type AlbumInput = MediaInput & {
  artist: string
}

export type MovieInput = MediaInput & {
  year: string
}

export type TVShowInput = MediaInput & {
  season?: string
}

export type QueryAlbumInput = {
  input: AlbumInput
}

export type QueryAlbumsInput = {
  input: [AlbumInput]
}

export type QueryGameInput = {
  input: GameInput
}

export type QueryGamesInput = {
  input: [GameInput]
}

export type QueryMovieInput = {
  input: MovieInput
}

export type QueryMoviesInput = {
  input: [MovieInput]
}

export type QueryTVShowInput = {
  input: TVShowInput
}

export type QueryTVShowsInput = {
  input: [TVShowInput]
}

