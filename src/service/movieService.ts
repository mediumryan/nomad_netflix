import axios from 'axios';
// props
import { params, headers } from '@/service/index';

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieResponse = {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: Movie[];
};

// Movies
export const getNowPlayingMovies = async () => {
  const response = await axios.get(
    `${process.env.BASE_URL}/movie/now_playing`,
    {
      params,
      headers,
    }
  );

  if (response.status === 200) {
    return response.data as MovieResponse;
  } else {
    throw new Error('Fetch error');
  }
};

export const getPopularMovies = async () => {
  const response = await axios.get(`${process.env.BASE_URL}/movie/popular`, {
    params,
    headers,
  });
  if (response.status === 200) {
    return response.data as MovieResponse;
  } else {
    throw new Error('Fetch error');
  }
};

export const getTopRatedMovies = async () => {
  const response = await axios.get(`${process.env.BASE_URL}/movie/top_rated`, {
    params,
    headers,
  });
  if (response.status === 200) {
    return response.data as MovieResponse;
  } else {
    throw new Error('Fetch error');
  }
};

export const getMovieDetails = async (movieId: string) => {
  const response = await axios.get(`${process.env.BASE_URL}/movie/${movieId}`, {
    params,
    headers,
  });
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error('Fetch error');
  }
};

export const getMovieCredits = async (movieId: string) => {
  const response = await axios.get(
    `${process.env.BASE_URL}/movie/${movieId}/credits`,
    {
      params,
      headers,
    }
  );
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error('Fetch error');
  }
};

export const getMovieVideos = async (movieId: string) => {
  const response = await axios.get(
    `${process.env.BASE_URL}/movie/${movieId}/videos`,
    {
      params,
      headers,
    }
  );
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error('Fetch error');
  }
};
