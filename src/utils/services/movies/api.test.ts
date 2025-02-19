import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import MockAdapter from 'axios-mock-adapter';
import { fetchMovies, fetchMovieDetail } from './api';
import { ApiResponse, MovieDetailResponse } from './types';

const mock = new MockAdapter(axios);

describe('API Tests', () => {
  afterEach(() => {
    mock.reset();
  });

  it('fetchMovies should return movie data', async () => {
    const searchQuery = 'Inception';
    const mockResponse: ApiResponse = {
      results: [
        {
          id: '1',
          title: 'Inception',
          overview: 'A mind-bending thriller',
          vote_average: 8.8,
          Title: 'Inception',
          Year: '2010',
          imdbID: 'tt1375666',
          Poster: 'https://example.com/poster.jpg',
          genres: [{ id: '1', name: 'Action' }],
          director: 'Christopher Nolan',
          actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page',
          release_date: '',
          poster_path: ''
        }
      ],
      totalResults: 1
    };

    mock.onGet(/https:\/\/api\.themoviedb\.org\/3\/search\/movie.*/).reply(200, mockResponse);

    const data = await fetchMovies(searchQuery);

    expect(data).toEqual(mockResponse);
  });

  it('fetchMovieDetail should return movie detail data', async () => {
    const movieId = '1';
    const mockResponse: MovieDetailResponse = {
      id: '1',
      title: 'Inception',
      poster_path: 'https://example.com/poster.jpg',
      overview: 'A mind-bending thriller',
      Genre: [{ id: '1', name: 'Action' }],
      Vote_average: 8.8,
      Plot: 'A mind-bending thriller',
      Director: 'Christopher Nolan',
      release_date: '2010-07-16',
      Actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page',
      popularity: '8.8'
    };

    mock.onGet(/https:\/\/api\.themoviedb\.org\/3\/movie\/\d+.*/).reply(200, mockResponse);

    const data = await fetchMovieDetail(movieId);

    expect(data).toEqual(mockResponse);
  });
});
