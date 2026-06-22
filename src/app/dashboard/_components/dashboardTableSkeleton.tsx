import { Skeleton } from '@/components/ui/skeleton';

export function DashboardTableSkeleton() {
  return (
    <main className="relative w-full overflow-hidden px-4 pb-5" style={{ height: 'calc(100vh - 56px)' }}>
      <div className="sticky top-0 z-50 w-full bg-background py-2">
        <div className="flex w-full items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Skeleton className="size-6 rounded" />
            <Skeleton className="h-8 w-40 rounded" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 w-32 rounded-md" />
            <Skeleton className="h-9 w-28 rounded-md" />
          </div>
        </div>
      </div>
      <div className="my-3 hidden gap-3 md:flex">
        <Skeleton className="h-10 w-40 rounded-sm" />
        <Skeleton className="h-10 w-32 rounded-sm" />
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[640px] border-collapse rounded-sm border border-border">
          <div className="flex border-b border-border bg-primary/20">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-10 w-24 flex-1 rounded-none"
              />
            ))}
          </div>
          {Array.from({ length: 10 }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="flex border-b border-border last:border-0"
            >
              {Array.from({ length: 8 }).map((_, colIndex) => (
                <Skeleton
                  key={colIndex}
                  className="m-1 h-8 w-20 flex-1 rounded"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
