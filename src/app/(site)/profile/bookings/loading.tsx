import { Skeleton } from "@/components/ui/Skeleton";

export default function BookingsLoading() {
  return (
    <div className="rounded-2xl bg-surface-peach p-6 md:p-10">
      <Skeleton className="h-8 w-56" />
      <Skeleton className="mt-2 h-4 w-72" />

      <div className="mt-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col bg-white rounded-lg my-3 px-5 gap-4 py-6 sm:flex-row sm:items-center sm:gap-6"
          >
            <Skeleton className="h-20 w-24 shrink-0 rounded-xl" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="flex shrink-0 flex-col items-end gap-2">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
