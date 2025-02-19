export interface Genre {
  id: string;
  name: string;
}

export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
  id: string;
  title: string;
  overview: string;
  genres: Genre[];
  director: string;
  actors: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
}

export interface MovieDetail extends Movie {
  Plot: string;
  Genre: string;
  Director: string;
  Actors: string;
  Rating: string;
}

export interface ApiResponse {
  results: Movie[];
  totalResults: number;
}

export interface MovieDetailResponse {
  id: string;
  title: string;
  Plot: string;
  Genre: { id: string; name: string }[];
  Director: string;
  overview: string;
  Actors: string;
  popularity: string;
  poster_path: string;
  Vote_average: number;
  release_date: string;
}
