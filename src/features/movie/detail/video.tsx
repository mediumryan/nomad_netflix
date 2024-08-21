'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { VideoResponse } from '@/service/movieService';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';

interface MovieDetailVideoProps {
  movieDetailVideo: VideoResponse;
}

export default function MovieDetailVideo({
  movieDetailVideo,
}: MovieDetailVideoProps) {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      orientation="vertical"
      className="w-full"
    >
      <CarouselContent className="-mt-1 h-[325px]">
        {movieDetailVideo?.results?.map((item, index) => (
          <CarouselItem key={index} className="pt-1">
            <div className="p-1 h-full">
              <Card className="h-full">
                <CardContent className="flex items-center justify-center p-6 h-full">
                  <iframe
                    key={item.id}
                    src={`https://www.youtube.com/embed/${item.key}`}
                    title={item.key}
                    className="w-3/4 h-full"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

{
  /* <Carousel
      className="max-w-xs h-full rounded-md overflow-hidden"
      // plugins={[
      //   Autoplay({
      //     delay: 2000,
      //   }),
      // ]}
    >
      <CarouselContent className="w-3/4 -mt-1 h-full">
        {movieDetailVideo.results?.map((item, index) => (
          <CarouselItem key={index}>
            <div className="w-full h-full p-1">
              <Card className="w-full h-full rounded-md overflow-hidden">
                <CardContent className="w-full h-full flex items-center justify-center p-6">
                  <iframe
                    key={item.id}
                    src={`https://www.youtube.com/embed/${item.key}`}
                    className="w-full h-full"
                    title={item.key}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel> */
}
