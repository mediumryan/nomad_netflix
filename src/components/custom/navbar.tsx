'use client';

import { Check, Menu, Search, StepBack } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useEffect, useState } from 'react';

export function Navigation() {
  const pathName = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(true);

  const [searchWord, setSearchWord] = useState('');
  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search/${searchWord}`);
    setSearchWord('');
  };

  useEffect(() => {
    setOpen(true);
  }, [pathName]);

  return (
    <nav
      className={`w-full p-2 ${
        open ? 'pb-2 bg-[rgba(0,0,0,0.5)]' : 'pb-8 bg-[rgba(0,0,0,0.9)]'
      } absolute top-0 left-0 z-50 flex flex-col md:flex-row items-center justify-between md:bg-transparent duration-700`}
    >
      <Link
        href="/"
        className="mr-8 text-xl italic font-bold tracking-[-1.5px] bg-gradient-to-r from-[#575d63] to-[#16032c] text-gradient rounded-l-2xl"
      >
        RYANFLIX
      </Link>
      <ul
        className={`w-1/2 md:w-full my-4 text-sm text-center md:flex ${
          open ? 'hidden' : 'block'
        }`}
      >
        <li
          className={`text-red-500 font-bold mx-1 p-1 hover:text-black hover:bg-sky-50 ${
            pathName === '/' ? ' bg-sky-50' : ''
          }`}
          style={{ borderRadius: '10px 10px 10px 0' }}
        >
          <Link href="/">HOME</Link>
        </li>
        <li
          className={`group relative text-red-500 font-bold mx-1 p-1 hover:text-black hover:bg-sky-50 ${
            pathName === '/movie' ? ' bg-sky-50' : ''
          }`}
          style={{ borderRadius: '10px 10px 10px 0' }}
        >
          <Link href="/movie">MOVIES</Link>
          <div
            className="absolute left-0 hidden w-[120px] py-2 mt-1 group-hover:flex flex-col justify-center items-center bg-sky-50"
            style={{ borderRadius: '0 10px 10px 10px' }}
          >
            <Link
              href="/movie/now-playing"
              className={`relative text-red-500 font-bold mx-1 rounded-md hover:text-black`}
            >
              Now Playing
            </Link>
            <Link
              href="/movie/popular"
              className={`relative text-red-500 font-bold mx-1 rounded-md hover:text-black`}
            >
              Popular
            </Link>
            <Link
              href="/movie/top-rated"
              className={`relative text-red-500 font-bold mx-1 rounded-md hover:text-black`}
            >
              Top Rated
            </Link>
          </div>
        </li>
        <li
          className={`relative group text-red-500 font-bold mx-1 p-1 hover:text-black hover:bg-sky-50 ${
            pathName === '/tv' ? ' bg-sky-50' : ''
          }`}
          style={{ borderRadius: '10px 10px 10px 0' }}
        >
          <Link href="/tv">TV SHOWS</Link>
          <div
            className="absolute left-0 hidden w-[120px] py-2 mt-1 group-hover:flex flex-col justify-center items-center bg-sky-50"
            style={{ borderRadius: '0 10px 10px 10px' }}
          >
            <Link
              href="/tv/airing-today"
              className={`relative text-red-500 font-bold mx-1 rounded-md hover:text-black`}
            >
              Airing Today
            </Link>
            <Link
              href="/tv/popular"
              className={`relative text-red-500 font-bold mx-1 rounded-md hover:text-black`}
            >
              Popular
            </Link>
            <Link
              href="/tv/top-rated"
              className={`relative text-red-500 font-bold mx-1 rounded-md hover:text-black`}
            >
              Top Rated
            </Link>
          </div>
        </li>
      </ul>
      <form
        onSubmit={handleSubmit}
        className={`flex items-center md:flex ${open ? 'hidden' : 'flex'}`}
      >
        <Search className="w-8 h-6" />
        <Input
          className="mx-2 text-black h-8 md:w-[250px]"
          type="text"
          value={searchWord}
          onChange={(e) => {
            setSearchWord(e.target.value);
          }}
        />
        <Button className="bg-transparent p-0">
          <Check className="w-8 h-6" />
        </Button>
      </form>
      <button
        className="md:hidden absolute top-3 left-4 hover:text-red-500"
        onClick={() => {
          router.back();
        }}
      >
        <StepBack />
      </button>
      <Menu
        className="absolute top-2 right-4 hover:text-red-500 md:hidden"
        onClick={() => {
          setOpen(!open);
        }}
      />
    </nav>
  );
}
