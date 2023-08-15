import axios from 'axios';

const API_KEY = '6207740ea0550aece9d7ae1d7e6d97f1';
const BASE_URL = 'https://api.themoviedb.org/3';

// Movies

export const getNowPlayingMovies = async (page) => {
    const response = await axios.get(
        `${BASE_URL}/movie/now_playing?language='ko-KR'&page=${
            page ?? 1
        }&api_key=${API_KEY}`
    );
    return response.data;
};

export const getTopRatedMovies = async (page) => {
    const response = await axios.get(
        `${BASE_URL}/movie/top_rated?language='ko-KR'&page=${
            page ?? 1
        }&api_key=${API_KEY}`
    );
    return response.data;
};

export const getPopularMovies = async (page) => {
    const response = await axios.get(
        `${BASE_URL}/movie/popular?language='ko-KR'&page=${
            page ?? 1
        }&api_key=${API_KEY}`
    );
    return response.data;
};

// Tv Shows

export const getTvShows = async (page) => {
    const response = await axios.get(
        `${BASE_URL}/tv/popular?language='ko-KR'&page=${
            page ?? 1
        }&api_key=${API_KEY}`
    );
    return response.data;
};
