import Image from 'next/image';

export const Loading = () => {
  return (
    <div className="absolute left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-5">
        <Image
          src="/logo.png"
          alt="AgroFinance"
          width={80}
          height={80}
          className="size-16 animate-pulse"
          priority
        />
        <p className="text-sm font-medium text-muted-foreground">
          Carregando...
        </p>
        <div className="flex items-center gap-1.5">
          <span
            className="size-2 animate-bounce rounded-full bg-primary"
            style={{ animationDelay: '0ms' }}
          />
          <span
            className="size-2 animate-bounce rounded-full bg-primary"
            style={{ animationDelay: '150ms' }}
          />
          <span
            className="size-2 animate-bounce rounded-full bg-primary"
            style={{ animationDelay: '300ms' }}
          />
        </div>
      </div>
    </div>
  );
};
