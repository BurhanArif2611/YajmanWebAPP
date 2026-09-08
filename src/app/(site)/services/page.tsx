import { ServicesHero } from "@/components/service/ServicesHero";
import { FilterSidebar } from "@/components/service/FilterSidebar";
import { SortBar } from "@/components/service/SortBar";
import { ServiceCard } from "@/components/service/ServiceCard";
import { Pagination } from "@/components/ui/Pagination";
import { getServices } from "@/lib/api/services";
import { mapServiceToCard } from "@/lib/mappers/service";
import type { ServiceSortOption } from "@/types/api";

const PAGE_SIZE = 9;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  const page = Number(first(params.page) ?? 1) || 1;
  const search = first(params.search);
  const category = first(params.category);
  const type = first(params.type);
  const minPrice = first(params.min_price);
  const maxPrice = first(params.max_price);
  const rating = first(params.rating);
  const sort = first(params.sort) as ServiceSortOption | undefined;

  let services: ReturnType<typeof mapServiceToCard>[] = [];
  let pageCount = 1;
  let total = 0;
  let loadError = false;

  try {
    const result = await getServices({
      page,
      limit: PAGE_SIZE,
      search,
      category,
      type,
      min_price: minPrice ? Number(minPrice) : undefined,
      max_price: maxPrice ? Number(maxPrice) : undefined,
      rating: rating ? Number(rating) : undefined,
      sort,
      requires_payment: true,
    });

    services = result.data.map(mapServiceToCard);
    pageCount = result.pagination?.total_pages ?? 1;
    total = result.pagination?.total ?? result.data.length;
  } catch {
    loadError = true;
  }

  return (
    <>
      <ServicesHero title="Our Services" showMobileFilters />

      <div className="relative z-10 bg-white pt-2 sm:-mt-8 sm:rounded-t-[32px] sm:pt-10 md:-mt-10">
        <div className="mx-auto max-w-site px-4 pb-16 md:px-8 md:pb-20 lg:px-16 lg:pb-24">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr] lg:gap-8">
            <FilterSidebar />

            <div>
              <SortBar resultCount={services.length} total={total} />

              {loadError ? (
                <p className="mt-8 text-center text-text-muted">
                  Unable to load services right now. Please try again later.
                </p>
              ) : services.length ? (
                <>
                  <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
                    {services.map((service) => (
                      <ServiceCard key={service.slug} service={service} />
                    ))}
                  </div>

                  <Pagination pageCount={pageCount} />
                </>
              ) : (
                <p className="mt-8 text-center text-text-muted">No services found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
