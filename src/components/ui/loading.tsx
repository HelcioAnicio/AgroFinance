import { Loader } from 'lucide-react';
import React from 'react';

export const Loading = () => {
  return (
    <div className="absolute left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-background">
      <Loader className="size-32 animate-[round_3s_linear_infinite]" />
      <p>Carregando ...</p>
    </div>
  );
};
