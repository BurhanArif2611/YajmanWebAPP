import { ServicesHero } from "@/components/service/ServicesHero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { FilterSidebar } from "@/components/service/FilterSidebar";
import { SortBar } from "@/components/service/SortBar";
import { ServiceCard } from "@/components/service/ServiceCard";
import { Pagination } from "@/components/ui/Pagination";
import { SERVICES } from "@/lib/constants";

const PAGE_SIZE = 9;

export default function ServicesPage() {
  const services = SERVICES.slice(0, PAGE_SIZE);

  return (
    <>
      <ServicesHero title="Our Services" />

      <div className="relative z-10 -mt-8 rounded-t-[32px] bg-white md:-mt-10">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Our Services" }]} />

        <div className="mx-auto max-w-site px-4 pb-16 md:px-8 md:pb-20 lg:px-16 lg:pb-24">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
            <FilterSidebar />

            <div>
              <SortBar resultCount={services.length} />

              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                  <ServiceCard key={service.slug} service={service} />
                ))}
              </div>

              <Pagination pageCount={2} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
