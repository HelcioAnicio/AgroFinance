import { Skeleton } from '@/components/ui/skeleton';

export default function AnimalDetailLoading() {
  return (
    <div className="pb-14">
      {/* Top bar */}
      <div className="sticky top-0 z-40 border-b bg-background px-4 py-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-6 w-52 rounded-lg" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-8 w-24 rounded-lg" />
            <Skeleton className="h-8 w-20 rounded-lg" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl space-y-4 px-4 py-5">
        {/* Row 1 */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Dados básicos */}
          <div className="lg:col-span-2 rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-start justify-between">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <div className="grid grid-cols-3 gap-x-6 gap-y-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <Skeleton className="h-2.5 w-20" />
                  <Skeleton className="h-6 w-28" />
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Skeleton className="h-14 rounded-xl" />
              <Skeleton className="h-14 rounded-xl" />
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border bg-white p-5 shadow-sm space-y-3">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-7 w-24 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-2.5 w-20" />
                <Skeleton className="h-5 w-32" />
              </div>
            </div>
            <div className="rounded-2xl border bg-white p-5 shadow-sm space-y-3">
              <Skeleton className="h-3 w-28" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-9 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Offspring */}
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="space-y-1.5">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-3 w-52" />
            </div>
          </div>
          <div className="flex gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="min-w-[150px] h-32 shrink-0 rounded-xl" />
            ))}
          </div>
        </div>

        {/* Reproduction + efficiency */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Skeleton className="h-40 rounded-2xl" />
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <Skeleton className="mb-4 h-5 w-40" />
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-14 rounded-xl" />
              ))}
            </div>
          </div>
        </div>

        {/* Weight + GMD */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Skeleton className="h-40 rounded-2xl" />
          <Skeleton className="h-40 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
