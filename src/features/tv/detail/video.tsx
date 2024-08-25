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

interface TvDetailVideoProps {
  tvDetailVideo: VideoResponse;
}

export default function TvDetailVideo({ tvDetailVideo }: TvDetailVideoProps) {
  const data = tvDetailVideo?.results;

  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      orientation="vertical"
      className="w-full"
    >
      <CarouselContent className="-mt-1 h-[325px]">
        {data.length > 0 ? (
          data?.map((item, index) => (
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
          ))
        ) : (
          <CarouselItem className="pt-1">
            <div className="p-1 h-full">
              <Card className="h-full">
                <CardContent className="flex items-center justify-center p-6 h-full">
                  <div className="text-2xl text-sky-50 bg-[rgba(0,0,0,0.75)] w-full h-full rounded-md flex justify-center items-center">
                    No Video
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
