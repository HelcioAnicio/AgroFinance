import { Skeleton } from '@/components/ui/skeleton';

export function DashboardTableSkeleton() {
  return (
    <main
      style={{ height: 'calc(100vh - 170px)' }}
      className="relative m-auto max-w-max pb-5"
    >
      <div className="sticky right-0 top-0 z-50 max-h-max w-full">
        <div className="relative flex w-full justify-between gap-10 px-1">
          <div className="flex items-center gap-3">
            <Skeleton className="size-6 rounded" />
            <Skeleton className="h-8 w-40 rounded" />
          </div>
          <div className="flex flex-col gap-3 md:flex-row">
            <Skeleton className="h-9 w-32 rounded-md" />
            <Skeleton className="h-9 w-28 rounded-md" />
          </div>
        </div>
      </div>
      <br className="md:hidden" />
      <div className="my-5 hidden gap-3 md:flex">
        <Skeleton className="h-10 w-40 rounded-sm" />
        <Skeleton className="h-10 w-32 rounded-sm" />
      </div>
      <div className="h-full w-full overflow-y-auto pb-28 md:pb-20">
        <div className="m-auto max-w-max overflow-x-auto">
          <div className="border-collapse rounded-sm border border-border">
            <div className="flex border-b border-border bg-primary/20">
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-10 flex-1 min-w-[80px] rounded-none last:min-w-[60px]"
                />
              ))}
            </div>
            {Array.from({ length: 8 }).map((_, rowIndex) => (
              <div
                key={rowIndex}
                className="flex border-b border-border last:border-0"
              >
                {Array.from({ length: 10 }).map((_, colIndex) => (
                  <Skeleton
                    key={colIndex}
                    className="m-1 h-8 flex-1 min-w-[70px] rounded last:min-w-[50px]"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
