import { Skeleton } from "@/components/ui/Skeleton";

export default function CheckoutLoading() {
  return (
    <div className="mx-auto max-w-site px-4 py-10 md:px-8 lg:px-16 lg:py-8">
      <Skeleton className="h-10 w-48" />

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
        <div className="flex flex-col gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-lg bg-surface-warm border border-gray-200 p-6">
              <Skeleton className="h-6 w-1/3" />
              <div className="mt-5 flex flex-col gap-3">
                <Skeleton className="h-14 w-full rounded-xl" />
                <Skeleton className="h-14 w-full rounded-xl" />
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-lg bg-white p-6 border border-gray-200">
          <Skeleton className="h-6 w-1/2" />
          <div className="mt-5 flex gap-4 border-b border-border pb-5">
            <Skeleton className="h-[90px] w-[99px] shrink-0 rounded-lg" />
            <div className="flex-1 flex flex-col gap-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
          <Skeleton className="mt-5 h-11 w-full rounded-md" />
          <Skeleton className="mt-6 h-12 w-full rounded-full" />
        </div>
      </div>
    </div>
  );
}
