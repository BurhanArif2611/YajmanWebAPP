"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { OPEN_SERVICE_FILTERS_EVENT } from "@/lib/serviceFilters";

function openFilters() {
  window.dispatchEvent(new Event(OPEN_SERVICE_FILTERS_EVENT));
}

function useServiceSearch(pathname: string) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  useEffect(() => {
    setSearch(searchParams.get("search") ?? "");
  }, [searchParams]);

  const applySearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) params.set("search", value.trim());
    else params.delete("search");
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return { search, setSearch, searchParams, applySearch };
}

function DesktopSearch({ pathname }: { pathname: string }) {
  const { search, setSearch, applySearch } = useServiceSearch(pathname);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        applySearch(search);
      }}
      className="absolute bottom-5 left-1/2 z-20 flex w-full max-w-2xl -translate-x-1/2 gap-2 rounded-full border border-border-dark bg-white p-2 shadow-card-hover"
    >
      <Input
        variant="pill"
        type="text"
        placeholder="Search for Puja, Festival & Rituals..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        containerClassName="min-h-[44px] flex-1 bg-transparent"
        leading={<Search size={20} />}
      />
      <Button type="submit" size="md" className="rounded-full px-8">
        Search
      </Button>
    </form>
  );
}

function MobileSearchBar({
  pathname,
  showMobileFilters,
}: {
  pathname: string;
  showMobileFilters?: boolean;
}) {
  const { search, setSearch, searchParams, applySearch } = useServiceSearch(pathname);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        applySearch(search);
      }}
      className="flex w-full items-center gap-2"
    >
      <Input
        variant="default"
        type="search"
        enterKeyHint="search"
        placeholder="Search for Puja, Festival & Rituals..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onBlur={() => {
          const current = searchParams.get("search") ?? "";
          if (search.trim() !== current) applySearch(search);
        }}
        containerClassName="min-h-[48px] flex-1 rounded-full border border-border-dark bg-white"
        leading={<Search size={18} />}
      />
      {showMobileFilters && (
        <button
          type="button"
          onClick={openFilters}
          aria-label="Open filters"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-saffron-400 text-white shadow-card"
        >
          <SlidersHorizontal size={18} />
        </button>
      )}
    </form>
  );
}

export function ServicesHero({
  title,
  showMobileFilters,
}: {
  title: string;
  showMobileFilters?: boolean;
}) {
  const pathname = usePathname();

  return (
    <section className="relative overflow-hidden">
      <div className="relative flex min-h-[160px] items-center justify-center md:min-h-[300px]">
        <Image
          src="/images/misc/serivce-banner.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-brand-navy/40" />

        <div className="relative z-10 mx-auto flex w-full max-w-narrow flex-col items-center px-4 py-8 text-center md:py-12">
          <h1 className="font-sans text-2xl font-semibold text-white md:text-6xl">
            {title}
          </h1>
        </div>

        <div className="hidden sm:block">
          <Suspense fallback={null}>
            <DesktopSearch pathname={pathname} />
          </Suspense>
        </div>
      </div>

      <div className="bg-white px-4 pb-5 pt-5 sm:hidden">
        <Suspense
          fallback={
            <div className="flex items-center gap-2">
              <div className="h-12 flex-1 rounded-full bg-surface-muted" />
              {showMobileFilters && (
                <div className="h-12 w-12 shrink-0 rounded-full bg-brand-saffron-400" />
              )}
            </div>
          }
        >
          <MobileSearchBar pathname={pathname} showMobileFilters={showMobileFilters} />
        </Suspense>
      </div>
    </section>
  );
}
