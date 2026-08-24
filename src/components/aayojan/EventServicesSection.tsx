import Image from "next/image";
import { format, parseISO } from "date-fns";
import { ArrowUpRight, Calendar, MapPin } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { AvatarCluster } from "@/components/aayojan/AvatarCluster";
import { resolveImageUrl } from "@/lib/mappers/service";
import type { AayojanEvent } from "@/types/api";

export function EventServicesSection({ events }: { events: AayojanEvent[] }) {
  if (!events.length) return null;

  return (
    <section className="bg-[url(/images/ayongan/service-bg.png)] bg-cover bg-center bg-no-repeat">
      <div className="mx-auto max-w-site px-4 py-16 md:px-8 md:py-20 lg:px-16 lg:py-24">
        <SectionHeader
          eyebrow="Our Devotional Events"
          heading="Explore Our Sacred Event Services"
          subtitle="We are hosting the 2026 World Marketing Summit this year, same like last year. It is the assembly of all the large"
        />

        <div className="mt-12 flex flex-col gap-6">
          {events.map((event) => (
              <div
                key={event.id}
                className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-card md:p-8 lg:flex-row lg:items-center"
              >
                <div className="relative h-64 w-full shrink-0 overflow-hidden rounded-2xl lg:h-72 lg:w-[420px]">
                  <Image
                    src={resolveImageUrl(event.feature_image_url)}
                    alt={event.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover"
                  />
                  {event.event_date && (
                    <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-text-primary shadow-card">
                      <Calendar size={12} className="text-brand-saffron-400" />
                      {format(parseISO(event.event_date), "d, MMM yyyy")}
                    </span>
                  )}
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-3">
                  <h3 className="font-sans text-xl font-bold break-words text-text-primary sm:text-2xl">
                    {event.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-muted">
                    {event.short_description || event.description}
                  </p>
                  {(event.location || event.city) && (
                    <p className="flex min-w-0 items-start gap-1.5 text-sm text-text-muted">
                      <MapPin size={14} className="mt-0.5 shrink-0 text-brand-saffron-400" />
                      <span className="break-words">
                        <span className="font-semibold text-text-primary">Location:</span>{" "}
                        {[event.location, event.city].filter(Boolean).join(", ")}
                      </span>
                    </p>
                  )}
                  <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
                    <ButtonLink
                      href="/contact"
                      size="sm"
                      className="w-fit gap-2 rounded-full tracking-wide"
                    >
                      Contact Us
                      <ArrowUpRight size={16} />
                    </ButtonLink>
                    <AvatarCluster count="10+" label={`${event.total_reviews} Reviews`} />
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
    </section>
  );
}
