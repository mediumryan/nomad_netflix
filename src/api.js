import axios from 'axios';

const API_KEY =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmJlYzA2NTNhZmQ5ZDI3MjBiZjU0NGM3NWU0MTlkOCIsInN1YiI6IjYzNzYyNWZlZmFiM2ZhMDBiNGQwMjM4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5smNKT_2xBtFZGcQtTnIy_5ufNzL5Ah00oHMrNcpFLE';
const BASE_URL = 'https://api.themoviedb.org/3';

const headers = {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
};

export const getNowPlayingMovies = async () => {
    const params = { language: 'ko-KR', page: 1, region: 'KR' };
    const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
        params,
        headers,
    });
    return response.data;
};

export const getPopularMovies = async () => {
    const params = { language: 'ko-KR', page: 1, region: 'KR' };
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params,
        headers,
    });
    return response.data;
};

export const getTopRatedMovies = async () => {
    const params = { language: 'ko-KR', page: 1, region: 'KR' };
    const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
        params,
        headers,
    });
    return response.data;
};

export const getPopularTvShows = async () => {
    const params = { language: 'ko-KR', page: 1, region: 'KR' };
    const response = await axios.get(`${BASE_URL}/tv/popular`, {
        params,
        headers,
    });
    return response.data;
};

export const getAiringTodayTvShows = async () => {
    const params = { language: 'ko-KR', page: 1, region: 'KR' };
    const response = await axios.get(`${BASE_URL}/tv/airing_today`, {
        params,
        headers,
    });
    return response.data;
};

export const getTopRatedTvShows = async () => {
    const params = { language: 'ko-KR', page: 1, region: 'KR' };
    const response = await axios.get(`${BASE_URL}/tv/top_rated`, {
        params,
        headers,
    });
    return response.data;
};
