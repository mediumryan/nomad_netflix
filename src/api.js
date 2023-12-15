import axios from 'axios';

const API_KEY =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNTdhNjc5OTE0Yjc4NWU5MzdlODI3M2VkZjEzYmFjYiIsInN1YiI6IjYzNzYyNWZlZmFiM2ZhMDBiNGQwMjM4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GviGW3SOtq4sot8aJp8to7nRlL2iZ5H38FbBcElfYik';
const BASE_URL = 'https://api.themoviedb.org/3';

const headers = {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
};

const params = { language: 'ja-JP', page: 1, region: 'JP' };

// Movies
export const getNowPlayingMovies = async () => {
    const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
        params,
        headers,
    });
    return response.data;
};

export const getPopularMovies = async () => {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params,
        headers,
    });
    return response.data;
};

export const getTopRatedMovies = async () => {
    const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
        params,
        headers,
    });
    return response.data;
};

export const getMovieDetails = async (movieId) => {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
        params,
        headers,
    });
    return response.data;
};

export const getMovieCredits = async (movieId) => {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
        params,
        headers,
    });
    return response.data;
};

export const getMovieVideos = async (movieId) => {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/videos`, {
        params,
        headers,
    });
    return response.data;
};

// TV Shows
export const getPopularTvShows = async () => {
    const response = await axios.get(`${BASE_URL}/tv/popular`, {
        params,
        headers,
    });
    return response.data;
};

export const getAiringTodayTvShows = async () => {
    const response = await axios.get(`${BASE_URL}/tv/airing_today`, {
        params,
        headers,
    });
    return response.data;
};

export const getTopRatedTvShows = async () => {
    const response = await axios.get(`${BASE_URL}/tv/top_rated`, {
        params,
        headers,
    });
    return response.data;
};

export const getTvShowDetails = async (tvShowId) => {
    const response = await axios.get(`${BASE_URL}/tv/${tvShowId}`, {
        params,
        headers,
    });
    return response.data;
};

export const getTvShowCredits = async (tvShowId) => {
    const response = await axios.get(`${BASE_URL}/tv/${tvShowId}/credits`, {
        params,
        headers,
    });
    return response.data;
};

export const getTvShowVideos = async (tvShowId) => {
    const response = await axios.get(`${BASE_URL}/tv/${tvShowId}/videos`, {
        params,
        headers,
    });
    return response.data;
};

// search tv & movie

export const getSearch = async (query) => {
    const response = await axios.get(
        `${BASE_URL}/search/multi?query=${query}`,
        {
            params,
            headers,
        }
    );
    return response.data;
};
