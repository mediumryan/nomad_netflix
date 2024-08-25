import TvContent from '@/features/tv/tvContent';
import {
  getAiringTodayTvShows,
  getPopularTvShows,
  getTopRatedTvShows,
} from '@/service/tvShowService';

export default async function TvPage() {
  const tvAiringToday = (await getAiringTodayTvShows()).results;
  const tvPopular = (await getPopularTvShows()).results;
  const tvTopRated = (await getTopRatedTvShows()).results;

  return (
    <TvContent
      tvAiringToday={tvAiringToday}
      tvPopular={tvPopular}
      tvTopRated={tvTopRated}
    />
  );
}
