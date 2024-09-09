import Content from '@/features/tv/airing-today/content';
import { AccentTextColor } from '@/service/common';
import { getTopRatedTvShows } from '@/service/tvShowService';

export default async function Page() {
  const data = (await getTopRatedTvShows()).results;

  return (
    <div className="flex flex-col bg-black">
      <div className="mt-24 mb-12 text-center text-2xl">
        <h2 style={{ textShadow: AccentTextColor }}>Tv : Top Rated</h2>
      </div>
      <Content data={data} />
    </div>
  );
}
