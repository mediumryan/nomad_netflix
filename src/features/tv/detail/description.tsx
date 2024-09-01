'use client';

import { trailerOpenAtom } from '@/data/detail';
import { AccentTextColor } from '@/service/common';
import { getImages } from '@/utils/getImage';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface DescriptionProps {
  TvDetailData: any;
  tvDetailGenre: any;
  tvDetailCredit: string;
}

type ProductionCompaniesType = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export default function Description({
  TvDetailData,
  tvDetailGenre,
  tvDetailCredit,
}: DescriptionProps) {
  // vote average for arr
  const voteArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const open = useAtomValue(trailerOpenAtom);

  return (
    <div
      className={`md:basis-5/12 md:pt-24 md:pl-24 ${
        open ? 'hidden' : 'block'
      } md:block duration-700 origin-center`}
    >
      <h2 className="text-2xl">{TvDetailData.name}</h2>
      <h5>{TvDetailData.original_name}</h5>
      <div className="my-8 text-sm">
        <p
          className="text-lg italic mb-2"
          style={{ textShadow: AccentTextColor }}
        >
          {TvDetailData.tagline}
        </p>
        <p>{TvDetailData.overview}</p>
      </div>
      <div className="flex items-center text-sm truncate">
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
      <div className="flex items-center text-sm mt-2 truncate">
        <span className="mr-2">제작사 :</span>
        {TvDetailData.production_companies
          .slice(0, 5)
          .map((item: ProductionCompaniesType) => {
            return (
              <div key={item.id} className="relative w-12 h-4 bg-white mr-1">
                <Image
                  src={getImages(item.logo_path)}
                  alt={item.name}
                  layout="fill"
                />
              </div>
            );
          })}
      </div>
      <div className="flex items-center text-sm mt-2 truncate">
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
        <p>{TvDetailData.status === 'Returning Series' ? '방영중' : '종영'}</p>
      </div>
      <div className="flex items-center text-sm mt-2">
        {TvDetailData.adult && (
          <span className="mr-2 bg-red-500 rounded-full p-1">청불</span>
        )}
      </div>
    </div>
  );
}
