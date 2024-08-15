'use client';

import { Movie } from '@/service/movieService';
import { convertGenres } from '@/utils/convertGenres';
import { getImages } from '@/utils/getImage';
import Image from 'next/image';

interface MovieContentProps {
  movieNowPlaying: Movie[];
  moviePopular: Movie[];
  movieTopRated: Movie[];
}

export default function MovieContent({
  movieNowPlaying,
  moviePopular,
  movieTopRated,
}: MovieContentProps) {
  const bigPosterItem = movieNowPlaying[0];

  return (
    <div className="flex flex-col items-center">
      {/* movie big poster */}
      <div className="relative w-screen h-screen">
        <Image
          layout="fill"
          src={getImages(bigPosterItem.poster_path)}
          alt={bigPosterItem.title}
          className="z-10"
        />
        {/* for bg gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black to-transparent z-20"></div>
        {/* big poster - info box */}
        <div
          className="absolute top-1/2 left-24 w-1/3 min-h-48 max-h-96 bg-black z-30 opacity-80 p-4 rounded-lg
          flex flex-col
        "
        >
          <h2 className="text-2xl">{bigPosterItem.title}</h2>
          <h5 className="mb-4">{bigPosterItem.original_title}</h5>
          <p className="text-sm">{bigPosterItem.overview}</p>
          <p className="text-sm mt-4">
            장르 : {convertGenres(bigPosterItem.genre_ids)}
          </p>
        </div>
      </div>
      {/* movie slider */}
      <div>
        {/* movie popular */}
        <div></div>
        {/* movie top rated */}
        <div></div>
        {/* movie upcoming */}
        <div></div>
      </div>
    </div>
  );
}
