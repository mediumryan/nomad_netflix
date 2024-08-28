'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { trailerOpenAtom } from '@/data/detail';
import { VideoResponse } from '@/service/movieService';
import { useAtomValue } from 'jotai';

interface MovieDetailVideoProps {
  movieDetailVideo: VideoResponse;
}

export default function MovieDetailVideo({
  movieDetailVideo,
}: MovieDetailVideoProps) {
  const data = movieDetailVideo?.results;
  const open = useAtomValue(trailerOpenAtom);

  return (
    <Carousel
      orientation="vertical"
      className={`w-full ${
        open ? 'block' : 'hidden'
      } md:block duration-700 origin-center`}
    >
      <CarouselContent className="-mt-1 h-[500px] md:h-[325px]">
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
                      className="w-full md:w-3/4 h-full"
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
