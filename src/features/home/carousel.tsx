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
  data: MovieResponse | TvResponse;
}

export function HomeCarousel({ type, data }: HomeCarouselProps) {
  const homeData = data.results;

  return (
    <div>
      <div className="opacity-85 md:opacity-70 hover:opacity-100">
        <h2 className="text-lg font-bold italic text-center">
          {type === 'movie' ? 'Movies' : 'Tv Shows'}
        </h2>
        <Carousel
          className="w-full max-w-xs m-4 rounded-md overflow-hidden"
          plugins={[
            Autoplay({
              delay: 2000,
              stopOnMouseEnter: true,
              stopOnInteraction: false,
            }),
          ]}
          opts={{ loop: true }}
        >
          <CarouselContent>
            {homeData?.map((item, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="rounded-md overflow-hidden">
                    <CardContent className="flex aspect-square items-center justify-center">
                      <Link
                        className="rounded-md w-[250px] h-[300px] md:w-[300px] md:h-[400px] flex justify-center items-center bg-black"
                        href={`${type === 'movie' ? '/movie' : '/tv'}`}
                      >
                        <img
                          className="rounded-md w-full h-full"
                          src={getImages(
                            item.poster_path || item.backdrop_path
                          )}
                          alt={type === 'movie' ? item?.title : item.name}
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
    </div>
  );
}
