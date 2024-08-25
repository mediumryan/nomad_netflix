import { Tv } from '@/service/tvShowService';
import React from 'react';
import TvBigPoster from './tvBigPoster';
import ContentSlider from './contentSlider';

interface TvContentProps {
  tvAiringToday: Tv[];
  tvPopular: Tv[];
  tvTopRated: Tv[];
}

export default function TvContent({
  tvAiringToday,
  tvPopular,
  tvTopRated,
}: TvContentProps) {
  const bigPosterItem = tvAiringToday[0];

  console.log(bigPosterItem);

  return (
    <div className="flex flex-col items-center">
      {/* movie big poster */}
      <TvBigPoster bigPosterItem={bigPosterItem} />
      {/* movie slider */}
      <div className="w-full h-screen space-2">
        {/* movie now playing */}
        <ContentSlider subTitle="Airing Today" data={tvAiringToday} />
        {/* movie popular */}
        <ContentSlider subTitle="Popular" data={tvPopular} />
        {/* movie top rated */}
        <ContentSlider subTitle="Top Rated" data={tvTopRated} />
      </div>
    </div>
  );
}
