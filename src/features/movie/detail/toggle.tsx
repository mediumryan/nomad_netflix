'use client';

import { Button } from '@/components/ui/button';
import { trailerOpenAtom } from '@/data/detail';
import { useAtom } from 'jotai';
import React from 'react';

export default function ToggleBtn() {
  const [open, setOpen] = useAtom(trailerOpenAtom);

  return (
    <Button
      className="absolute top-4 right-16 bg-yellow-500 md:hidden mt-24 md:m-0 z-40"
      onClick={() => {
        setOpen(!open);
      }}
    >
      Trailer
    </Button>
  );
}
