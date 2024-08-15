'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
  const pathName = usePathname();

  return (
    <nav className="w-full p-2 absolute top-0 left-0 z-50">
      <ul className="w-full h-12 flex items-center text-sm">
        <li>
          <Link
            href="/"
            className="mr-8 text-xl italic font-bold tracking-[-1.5px] bg-gradient-to-r from-[#575d63] to-[#16032c] text-gradient rounded-l-2xl"
          >
            RYANFLIX
          </Link>
        </li>
        <li
          className={`text-red-500 font-bold mx-1 p-1 rounded-md hover:text-black hover:bg-sky-50 ${
            pathName === '/' ? ' bg-sky-50' : ''
          }`}
        >
          <Link href="/">HOME</Link>
        </li>
        <li
          className={`text-red-500 font-bold mx-1 p-1 rounded-md hover:text-black hover:bg-sky-50 ${
            pathName === '/movie' ? ' bg-sky-50' : ''
          }`}
        >
          <Link href="/movie">MOVIES</Link>
        </li>
        <li
          className={`text-red-500 font-bold mx-1 p-1 rounded-md hover:text-black hover:bg-sky-50 ${
            pathName === '/tv' ? ' bg-sky-50' : ''
          }`}
        >
          <Link href="tv">TV SHOWS</Link>
        </li>
      </ul>
    </nav>
  );
}
