import { Skeleton } from '@/components/ui/skeleton';

export function DashboardHeaderSkeleton() {
  return (
    <header className="flex w-full items-center justify-between p-2">
      <div className="w-1/3">
        <Skeleton className="size-16 rounded-md" />
      </div>
      <nav className="flex w-full flex-col items-end gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="size-8 rounded-full" />
          </div>
          <Skeleton className="h-7 w-10 rounded-md" />
          <Skeleton className="size-8 rounded-md" />
        </div>
      </nav>
    </header>
  );
}
