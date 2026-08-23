import Image from "@/components/ui/AppImage";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { TopoDoodle } from "@/components/ui/TopoDoodle";

export function AuthLayout({
  backHref = "/",
  children,
}: {
  backHref?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white">
      <div className="hidden w-[45%] shrink-0 p-4 lg:block">
        <div className="relative h-full w-full overflow-hidden rounded-[32px]">
          <Image
            src="/images/services/service-shivling.png"
            alt="Pandit performing puja"
            fill
            sizes="45vw"
            priority
            className="object-cover"
          />
        </div>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-16 md:px-12">
        {/* <TopoDoodle className="-right-10 -top-10 text-brand-saffron-100" /> */}
        <Image src="/images/decor/side-deco.png" alt="decoration" width={300} height={300} className="absolute -right-10 -top-10 z-0 bg-no-repeat bg-left-top bg-contain bg-[length:300px_auto] opacity-10 rotate-90" />
        <Link
          href={backHref}
          className="absolute right-6 top-6 flex items-center gap-1 rounded-full bg-surface-muted px-4 py-2 text-sm font-medium text-brand-saffron-400 md:right-10 md:top-10"
        >
          <ChevronLeft size={16} />
          Back
        </Link>

        <div className="relative z-10 flex w-full max-w-md flex-col gap-6">
          <Image
            src="/images/logo/logo.svg"
            alt="Yajman"
            width={180}
            height={60}
            className="h-auto w-40"
          />

          {children}

          <p className="mt-6 text-center text-xs font-medium tracking-wide text-text-light">
            © 2026 ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </div>
  );
}
