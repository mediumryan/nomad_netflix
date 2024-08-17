import axios from 'axios';
// props
import { params, headers } from '@/service/index';

// search tv & movie

export const getSearch = async (query: string) => {
  const response = await axios.get(
    `${process.env.BASE_URL}/search/multi?query=${query}`,
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

export const AccentTextColor = 'rgb(255,120,25) 0.5px 0 5px';
