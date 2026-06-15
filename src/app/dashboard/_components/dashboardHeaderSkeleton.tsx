import { Skeleton } from '@/components/ui/skeleton';

export function DashboardHeaderSkeleton() {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 flex h-14 items-center border-b bg-white">
      {/* Logo area */}
      <div className="flex h-full shrink-0 items-center gap-2.5 px-5 lg:w-56 lg:border-r">
        <Skeleton className="size-9 rounded-md" />
        <Skeleton className="h-4 w-24" />
      </div>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-2 px-4">
        <Skeleton className="h-8 w-28 rounded-lg" />
        <Skeleton className="size-8 rounded-md" />
        <Skeleton className="hidden h-8 w-14 rounded-md lg:block" />
      </div>
    </header>
  );
}
