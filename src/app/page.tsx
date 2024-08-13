import { HomeCarousel } from '@/features/home/carousel';
import { getNowPlayingMovies } from '@/service/movieService';
import { getPopularTvShows } from '@/service/tvShowService';

export default async function Home() {
  const homeMoviesData = await getNowPlayingMovies();
  const homeTvShowsData = await getPopularTvShows();

  return (
    <div className="w-full h-[calc(100vh-72px)] bg-home-image bg-cover bg-center flex items-center justify-center">
      <HomeCarousel type="movie" movieData={homeMoviesData} />
      <HomeCarousel type="tv" tvData={homeTvShowsData} />
    </div>
  );
}
