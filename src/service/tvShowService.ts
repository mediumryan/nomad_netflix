import axios from 'axios';
// props
import { params, headers } from '@/service/index';

// TV Shows
export const getPopularTvShows = async () => {
  const response = await axios.get(`${process.env.BASE_URL}/tv/popular`, {
    params,
    headers,
  });
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error('Fetch error');
  }
};

export const getAiringTodayTvShows = async () => {
  const response = await axios.get(`${process.env.BASE_URL}/tv/airing_today`, {
    params,
    headers,
  });
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error('Fetch error');
  }
};

export const getTopRatedTvShows = async () => {
  const response = await axios.get(`${process.env.BASE_URL}/tv/top_rated`, {
    params,
    headers,
  });
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error('Fetch error');
  }
};

export const getTvShowDetails = async (tvShowId: string) => {
  const response = await axios.get(`${process.env.BASE_URL}/tv/${tvShowId}`, {
    params,
    headers,
  });
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error('Fetch error');
  }
};

export const getTvShowCredits = async (tvShowId: string) => {
  const response = await axios.get(
    `${process.env.BASE_URL}/tv/${tvShowId}/credits`,
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

export const getTvShowVideos = async (tvShowId: string) => {
  const response = await axios.get(
    `${process.env.BASE_URL}/tv/${tvShowId}/videos`,
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
