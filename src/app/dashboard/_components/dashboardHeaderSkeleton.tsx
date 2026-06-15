import { Skeleton } from '@/components/ui/skeleton';

export function DashboardHeaderSkeleton() {
  return (
    <header className="sticky top-0 z-30 flex w-full items-center justify-between border-b bg-white/90 px-4 py-2 backdrop-blur-sm">
      {/* Mobile logo placeholder */}
      <Skeleton className="size-12 rounded-md lg:hidden" />

      {/* Right side: farm + notif + logout */}
      <div className="ml-auto flex items-center gap-2">
        <Skeleton className="h-8 w-28 rounded-lg" />
        <Skeleton className="size-8 rounded-md" />
        <Skeleton className="hidden h-8 w-14 rounded-md lg:block" />
      </div>
    </header>
  );
}
