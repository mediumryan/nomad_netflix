export const headers = {
  accept: 'application/json',
  Authorization: `Bearer ${process.env.API_KEY}`,
};

export const params = { language: 'ko-KR', page: 1, region: 'KR' };
