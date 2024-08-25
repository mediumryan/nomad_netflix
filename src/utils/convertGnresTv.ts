import { tvGenres } from '@/service/genre';

export const convertGenres = (genreIds: number[]) => {
  if (genreIds.length > 3) {
    return genreIds
      .slice(0, 3)
      .map((id) => {
        const genre = tvGenres.find((genre) => genre.id === id);
        return genre ? genre.name : 'Unknown';
      })
      .join(', ');
  }
  return genreIds
    .map((id) => {
      const genre = tvGenres.find((genre) => genre.id === id);
      return genre ? genre.name : 'Unknown';
    })
    .join(', ');
};
