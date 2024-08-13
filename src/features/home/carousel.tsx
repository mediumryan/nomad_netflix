'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { MovieResponse } from '@/service/movieService';
import { TvResponse } from '@/service/tvShowService';
import { getImages } from '@/utils/getImage';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';

interface HomeCarouselProps {
  type: string;
  movieData?: MovieResponse;
  tvData?: TvResponse;
}

export function HomeCarousel({ type, movieData, tvData }: HomeCarouselProps) {
  const movie = movieData?.results;
  const tv = tvData?.results;

  return (
    <div>
      {type === 'movie' ? (
        <div className="opacity-70 hover:opacity-100">
          <h2 className="text-lg font-bold italic text-center">Movies</h2>
          <Carousel
            className="w-full max-w-xs m-4 rounded-md overflow-hidden"
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent>
              {movie?.map((item, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="rounded-md overflow-hidden">
                      <CardContent className="flex aspect-square items-center justify-center">
                        <Link
                          className="w-full h-full flex justify-center items-center bg-black"
                          href="/movie"
                        >
                          <img
                            className="w-full h-full"
                            src={getImages(item.backdrop_path)}
                            alt={item.title}
                          />
                        </Link>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      ) : (
        <div className="opacity-70 hover:opacity-100">
          <h2 className="text-lg font-bold italic text-center">Tv Shows</h2>
          <Carousel
            className="w-full max-w-xs m-4 rounded-md overflow-hidden"
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent>
              {tv?.map((item, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="rounded-md overflow-hidden">
                      <CardContent className="flex aspect-square items-center justify-center">
                        <Link
                          className="w-full h-full flex justify-center items-center bg-black"
                          href="/movie"
                        >
                          <img
                            className="w-full h-full"
                            src={getImages(item.backdrop_path)}
                            alt={item.name}
                          />
                        </Link>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      )}
    </div>
  );
}
