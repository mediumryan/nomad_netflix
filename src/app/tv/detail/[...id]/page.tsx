import TvDetailVideo from '@/features/tv/detail/video';
import { AccentTextColor } from '@/service/common';
import { Credit } from '@/service/movieService';
import {
  getTvShowCredits,
  getTvShowDetails,
  getTvShowVideos,
} from '@/service/tvShowService';
import { getImages } from '@/utils/getImage';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface TvDetailProps {
  params: {
    id: string[];
  };
}

type ProductionCompaniesType = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export default async function TvDetail({ params }: TvDetailProps) {
  const tvId = params.id[0];
  // tv detail data
  const TvDetailData = await getTvShowDetails(tvId);

  // get genres
  const tvDetailGenre = TvDetailData.genres
    .map((item: { id: number; name: string }) => {
      return item.name;
    })
    .join(', ');
  // vote average for arr
  const voteArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // tv credit data
  const tvDetailCreditData = await getTvShowCredits(tvId);
  const tvDetailCredit = tvDetailCreditData.cast
    .slice(0, 3)
    .map((credit: Credit) => {
      return credit.name;
    })
    .join(', ');
  // tv video data
  const tvDetailVideo = await getTvShowVideos(tvId);

  return (
    <div className="relative w-full h-screen">
      <Image
        layout="fill"
        src={getImages(TvDetailData.poster_path)}
        alt={TvDetailData.name}
        className="z-10"
      />
      {/* for bg gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black to-transparent z-20"></div>
      {/* big poster - info box */}
      <div
        className="absolute top-[10%] left-12 w-[calc(100%-72px)] h-[85%] bg-[rgba(0,0,0,0.5)] z-30 p-4 rounded-lg
flex
"
      >
        <div className="basis-5/12 pt-24 pl-24">
          <h2 className="text-2xl">{TvDetailData.title}</h2>
          <h5>{TvDetailData.original_title}</h5>
          <div className="my-8 text-sm">
            <p
              className="text-lg italic mb-2"
              style={{ textShadow: AccentTextColor }}
            >
              {TvDetailData.tagline}
            </p>
            <p>{TvDetailData.overview}</p>
          </div>
          <div className="flex items-center text-sm">
            <span className="mr-2">장르 :</span>
            <p>{tvDetailGenre}</p>
          </div>
          <div className="flex items-center text-sm mt-2">
            <span className="mr-2">평점 :</span>
            {voteArr.map((_, index: number) => {
              return (
                <span
                  key={index}
                  className={`flex items-center w-2 h-4 mr-1 rounded-[1px] ${
                    TvDetailData.vote_average.toFixed(1) > index
                      ? 'bg-red-500'
                      : 'bg-sky-50'
                  }
              ${index === 9 && 'mr-2'}
              `}
                />
              );
            })}
            <span className="tracking-wider">
              ({TvDetailData.vote_average.toFixed(1)})
            </span>
          </div>
          <div className="flex items-center text-sm mt-2">
            <span className="mr-2">제작사 :</span>
            {TvDetailData.production_companies
              .slice(0, 5)
              .map((item: ProductionCompaniesType) => {
                return (
                  <img
                    key={item.id}
                    src={getImages(item.logo_path)}
                    alt={item.name}
                    className="w-12 h-4 mx-1 bg-sky-50"
                  />
                );
              })}
          </div>
          <div className="flex items-center text-sm mt-2">
            <span className="mr-2">출연 :</span>
            <span>{tvDetailCredit}</span>
          </div>
          <div className="flex items-center text-sm mt-2">
            <span className="mr-2">공식 :</span>
            <p>
              <Link
                target="blank"
                className="text-sky-500"
                href={TvDetailData.homepage}
              >
                {TvDetailData.homepage}
              </Link>
            </p>
          </div>
          <div className="flex items-center text-sm mt-2">
            <span className="mr-2">첫방영 :</span>
            <p>{TvDetailData.first_air_date}</p>
          </div>
          <div className="flex items-center text-sm mt-2">
            <span className="mr-2">상태 :</span>
            <p>
              {TvDetailData.status === 'Returning Series' ? '방영중' : '종영'}
            </p>
          </div>
          <div className="flex items-center text-sm mt-2">
            {TvDetailData.adult && (
              <span className="mr-2 bg-red-500 rounded-full p-1">청불</span>
            )}
          </div>
        </div>
        <div className="basis-7/12 flex justify-center items-center">
          <TvDetailVideo tvDetailVideo={tvDetailVideo} />
        </div>
      </div>
    </div>
  );
}
