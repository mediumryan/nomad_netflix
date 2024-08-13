'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
  const pathName = usePathname();

  return (
    <nav className="w-full px-2">
      <ul className="w-full h-12 flex items-center text-sm">
        <li>
          <Link
            href="/"
            className="mr-8 text-2xl italic font-bold tracking-[-1.5px] bg-gradient-to-r from-[#575d63] to-[#16032c] text-gradient rounded-l-2xl"
          >
            RYANFLIX
          </Link>
        </li>
        <li
          className={`mx-1 p-1 rounded-md hover:text-black hover:bg-sky-50 ${
            pathName === '/' ? 'text-black bg-sky-50' : ''
          }`}
        >
          <Link href="/">HOME</Link>
        </li>
        <li
          className={`mx-1 p-1 rounded-md hover:text-black hover:bg-sky-50 ${
            pathName === '/movie' ? 'text-black bg-sky-50' : ''
          }`}
        >
          <Link href="/movie">MOVIES</Link>
        </li>
        <li
          className={`mx-1 p-1 rounded-md hover:text-black hover:bg-sky-50 ${
            pathName === '/tv' ? 'text-black bg-sky-50' : ''
          }`}
        >
          <Link href="tv">TV SHOWS</Link>
        </li>
      </ul>
    </nav>
  );
}
