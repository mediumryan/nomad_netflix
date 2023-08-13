import axios from 'axios';

const MOVIE_API_KEY = '6207740ea0550aece9d7ae1d7e6d97f1';
const BASE_URL = 'https://api.themoviedb.org/3';

export const getMovies = async (page) => {
    const response = await axios.get(
        `${BASE_URL}/movie/now_playing?language='ko-KR'&page=${
            page ?? 1
        }&api_key=${MOVIE_API_KEY}`
    );
    return response.data;
};
