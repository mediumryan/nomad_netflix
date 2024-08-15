import MovieContent from '@/features/movie/movieContent';
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
} from '@/service/movieService';

export default async function MoviePage() {
  const movieNowPlaying = (await getNowPlayingMovies()).results;
  const moviePopular = (await getPopularMovies()).results;
  const movieTopRated = (await getTopRatedMovies()).results;

  return (
    <MovieContent
      movieNowPlaying={movieNowPlaying}
      moviePopular={moviePopular}
      movieTopRated={movieTopRated}
    />
  );
}
