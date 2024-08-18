import { AccentTextColor } from '@/service/common';
import {
  Credit,
  getMovieCredits,
  getMovieDetails,
  getMovieVideos,
} from '@/service/movieService';
import { getImages } from '@/utils/getImage';
import Image from 'next/image';

interface MovieDetailProps {
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

export default async function MovieDetail({ params }: MovieDetailProps) {
  const movieId = params.id[0];
  // movie detail data
  const movieDetailData = await getMovieDetails(movieId);
  // get genres
  const movieDetailGenre = movieDetailData.genres
    .map((item: { id: number; name: string }) => {
      return item.name;
    })
    .join(', ');
  // vote average for arr
  const voteArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // movie credit data
  const movieDetailCreditData = await getMovieCredits(movieId);
  console.log(movieDetailCreditData);
  const movieDetailCredit = movieDetailCreditData.cast
    .slice(0, 5)
    .map((credit: Credit) => {
      return credit.name;
    })
    .join(', ');
  // movie video data
  const movieDetailVideo = await getMovieVideos(movieId);

  return (
    <div className="relative w-full h-screen">
      <Image
        layout="fill"
        src={getImages(movieDetailData.poster_path)}
        alt={movieDetailData.title}
        className="z-10"
      />
      {/* for bg gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black to-transparent z-20"></div>
      {/* big poster - info box */}
      <div
        className="absolute top-[10%] left-12 w-[calc(100%-72px)] bg-black z-30 opacity-80 p-4 rounded-lg
    flex
  "
      >
        <div className="basis-1/2">
          <h2 className="text-2xl">{movieDetailData.title}</h2>
          <h5>{movieDetailData.original_title}</h5>
          <div className="my-8 text-sm">
            <p
              className="text-lg italic mb-2"
              style={{ textShadow: AccentTextColor }}
            >
              {movieDetailData.tagline}
            </p>
            <p>{movieDetailData.overview}</p>
          </div>
          <div className="flex items-center text-sm">
            <span className="mr-2">장르 :</span>
            <p>{movieDetailGenre}</p>
          </div>
          <div className="flex items-center text-sm mt-2">
            <span className="mr-2">평점 :</span>
            {voteArr.map((_, index: number) => {
              return (
                <span
                  key={index}
                  className={`flex items-center w-2 h-4 mr-1 rounded-[1px] ${
                    movieDetailData.vote_average.toFixed(1) >= index
                      ? 'bg-red-500'
                      : 'bg-sky-50'
                  }
                  ${index === 9 && 'mr-2'}
                  `}
                />
              );
            })}
            <span className="tracking-wider">
              ({movieDetailData.vote_average.toFixed(1)})
            </span>
          </div>
          <div className="flex items-center text-sm mt-2">
            <span className="mr-2">제작사 :</span>
            {movieDetailData.production_companies.map(
              (item: ProductionCompaniesType, index: number) => {
                return (
                  <img
                    key={item.id}
                    src={getImages(item.logo_path)}
                    alt={item.name}
                    className="w-12 h-4 mx-1 bg-sky-50"
                  />
                );
              }
            )}
          </div>
          <div className="flex items-center text-sm mt-2">
            <span className="mr-2">출연 :</span>
            <span>{movieDetailCredit}</span>
          </div>
          <div className="flex items-center text-sm mt-2">
            <span className="mr-2">개봉일 :</span>
            <p>{movieDetailData.release_date}</p>
          </div>
          <div className="flex items-center text-sm mt-2">
            <span className="mr-2">런타임 :</span>
            <p>{movieDetailData.runtime}분</p>
          </div>
          <div className="flex items-center text-sm mt-2">
            {movieDetailData.adult && (
              <span className="mr-2 bg-red-500 rounded-full p-1">청불</span>
            )}
          </div>
        </div>
      </div>
      <div className="basis-1/2">Video</div>
    </div>
  );
}
