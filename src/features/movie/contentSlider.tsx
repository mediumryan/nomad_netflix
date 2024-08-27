'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Link from 'next/link';
import { getImages } from '@/utils/getImage';
import { Movie } from '@/service/movieService';
import { AccentTextColor } from '@/service/common';
import Image from 'next/image';

interface ContentSliderProps {
  subTitle: string;
  data: Movie[];
}

export default function ContentSlider({ subTitle, data }: ContentSliderProps) {
  return (
    <div className="bg-black w-full py-2">
      <h3 className="text-lg ml-2 pt-2">{subTitle}</h3>
      <div className="w-full flex justify-center">
        <Carousel className="w-7/12 md:w-11/12">
          <CarouselContent className="-ml-1">
            {data.map((item, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/3 lg:basis-1/6"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="group relative flex aspect-square items-center justify-center p-2 origin-bottom duration-300 hover:-translate-y-4">
                      <Link href={`/movie/detail/${item.id}`}>
                        <Image
                          layout="fill"
                          className="rounded-md group-hover:opacity-15"
                          src={getImages(
                            item.poster_path || item.backdrop_path
                          )}
                          alt={item.title}
                        />
                        <div className="absolute text-white top-0 left-0 w-full h-full pt-4 px-4 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                          <h4
                            className="text-xl"
                            style={{ textShadow: AccentTextColor }}
                          >
                            {item.title}({item.vote_average.toFixed(1)})
                          </h4>
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
