import axios from 'axios';
import { ApiResponse, MovieDetailResponse } from './types';

const key = process.env.REACT_APP_TMDB_API_KEY;

const API_KEY = key;
const API_URL = 'https://api.themoviedb.org/3';

console.log(key);
export const fetchMovies = async (query: string) => {
  try {
    const response = await axios.get(`${API_URL}/search/movie`, {
      params: { query, api_key: API_KEY }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data', error);
    return { results: [], total_results: 0 }; // Return default empty response
  }
};

export const fetchMovieDetail = async (movieId: string): Promise<MovieDetailResponse> => {
  try {
    const response = await axios.get(`${API_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching movie details', error);
    return {} as MovieDetailResponse; // Return empty object on error
  }
};
