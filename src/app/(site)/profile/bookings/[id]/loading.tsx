import { Skeleton } from "@/components/ui/Skeleton";

export default function BookingDetailLoading() {
  return (
    <div className="rounded-2xl bg-surface-peach p-6 md:p-10">
      <Skeleton className="h-4 w-32" />

      <div className="mt-6 flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-card sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-4">
          <Skeleton className="h-20 w-24 shrink-0 rounded-xl" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-8 w-10" />
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-white p-6 shadow-card">
        <Skeleton className="h-6 w-48" />
        <div className="mt-4 flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
