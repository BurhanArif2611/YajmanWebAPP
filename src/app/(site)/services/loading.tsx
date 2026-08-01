import { Skeleton } from "@/components/ui/Skeleton";

function ServiceCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-xl bg-white p-3 shadow-card">
      <Skeleton className="aspect-square w-full rounded-lg" />
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="mt-2 h-10 w-full rounded-full" />
    </div>
  );
}

export default function ServicesLoading() {
  return (
    <div className="relative z-10 rounded-t-[32px] bg-white">
      <div className="mx-auto max-w-site px-4 pb-16 pt-10 md:px-8 md:pb-20 lg:px-16 lg:pb-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="flex flex-col gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-xl bg-white p-5 shadow-card">
                <Skeleton className="h-5 w-1/2" />
                <div className="mt-4 flex flex-col gap-3">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <Skeleton key={j} className="h-5 w-3/4" />
                  ))}
                </div>
              </div>
            ))}
          </aside>

          <div>
            <Skeleton className="h-5 w-40" />
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <ServiceCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
