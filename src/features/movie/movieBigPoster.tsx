import { Movie } from '@/service/movieService';
import { convertGenres } from '@/utils/convertGenres';
import { getImages } from '@/utils/getImage';
import { InfoIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface MovieBigPosterProps {
  bigPosterItem: Movie;
}

export default function MovieBigPoster({ bigPosterItem }: MovieBigPosterProps) {
  return (
    <div className="relative w-full h-screen">
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
        className="absolute top-1/2 left-4 w-1/2 min-h-48 max-h-full bg-black z-30 opacity-80 p-4 rounded-lg
    flex flex-col
  "
      >
        <h2 className="text-2xl">{bigPosterItem.title}</h2>
        <h5 className="mb-4">{bigPosterItem.original_title}</h5>
        <p className="text-sm">{bigPosterItem.overview}</p>
        <p className="text-sm mt-4">
          장르 : {convertGenres(bigPosterItem.genre_ids)}
        </p>
        <Link
          className="py-2 my-2 w-12 flex justify-center items-center hover:text-red-500"
          href={`/movie/detail/${bigPosterItem.id}`}
        >
          <InfoIcon />
        </Link>
      </div>
    </div>
  );
}
