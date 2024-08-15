import { movieGenres } from '@/service/genre';

export const convertGenres = (genreIds: number[]) => {
  return genreIds
    .map((id) => {
      const genre = movieGenres.find((genre) => genre.id === id);
      return genre ? genre.name : 'Unknown';
    })
    .join(', ');
};
