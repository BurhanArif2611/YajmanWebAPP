import { Skeleton } from "@/components/ui/Skeleton";

export default function ServiceDetailLoading() {
  return (
    <div className="mx-auto max-w-site px-4 pb-28 pt-8 md:px-8 lg:px-16 lg:pb-24">
      <div className="flex flex-col gap-4 border-b border-border pb-6">
        <Skeleton className="h-9 w-2/3" />
        <div className="flex flex-wrap items-center gap-3">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-8">
          <Skeleton className="aspect-[16/10] w-full rounded-2xl" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-card">
          <Skeleton className="h-6 w-40" />
          <div className="mt-3 flex flex-col gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <Skeleton className="mt-5 h-8 w-32" />
          <Skeleton className="mt-4 h-14 w-full rounded-xl" />
          <Skeleton className="mt-4 h-12 w-full rounded-full" />
        </div>
      </div>
    </div>
  );
}
