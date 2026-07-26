import Image from "next/image";
import { ArrowUpRight, Calendar, MapPin } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { AvatarCluster } from "@/components/aayojan/AvatarCluster";

const DESCRIPTION =
  "A beautifully organized devotional gathering featuring live bhajans, experienced pandits, traditional rituals, floral decoration, and seamless event management. A beautifully organized devotional gathering featuring live bhajans, experienced pandits, traditional rituals, floral decoration, and seamless event management.A beautifully organized devotional gathering featuring live bhajans, experienced pandits, traditional rituals, floral decoration, and seamless event management.";

const EVENTS = Array.from({ length: 3 }).map(() => ({
  title: "Grand Sundarkand Mahotsav",
  description: DESCRIPTION,
  date: "24, Sep 2026",
  location: "Ujjain, Madhya pradesh",
  image: "/images/ayongan/image-4.png",
}));

export function EventServicesSection() {
  return (
    <section className="bg-[url(/images/ayongan/service-bg.png)] bg-cover bg-center bg-no-repeat">
      <div className="mx-auto max-w-site px-4 py-16 md:px-8 md:py-20 lg:px-16 lg:py-24">
        <SectionHeader
          eyebrow="Our Devotional Events"
          heading="Explore Our Sacred Event Services"
          subtitle="We are hosting the 2026 World Marketing Summit this year, same like last year. It is the assembly of all the large"
        />

        <div className="mt-12 flex flex-col gap-6">
          {EVENTS.map((event, i) => (
            <div
              key={i}
              className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-card md:p-8 lg:flex-row lg:items-center"
            >
              <div className="relative h-64 w-full shrink-0 overflow-hidden rounded-2xl lg:h-72 lg:w-[420px]">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover"
                />
                <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-text-primary shadow-card">
                  <Calendar size={12} className="text-brand-saffron-400" />
                  {event.date}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-3">
                <h3 className="font-sans text-2xl font-bold text-text-primary">
                  {event.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-muted">
                  {event.description}
                </p>
                <p className="flex items-center gap-1.5 text-sm text-text-muted">
                  <MapPin size={14} className="text-brand-saffron-400" />
                  <span className="font-semibold text-text-primary">Location:</span>{" "}
                  {event.location}
                </p>
                <div className="flex items-start justify-between gap-2 mt-2">
                  <ButtonLink
                    href="/contact"
                    size="sm"
                    className="mt-2 w-fit gap-2 rounded-full  tracking-wide"
                  >
                    Contact Us
                    <ArrowUpRight size={16} />
                  </ButtonLink>
                  <div className="lg:self-center">
                    <AvatarCluster count="10+" label="1K + Reviews" />
                  </div>
                </div>
              </div>


            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
