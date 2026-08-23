import Image from "@/components/ui/AppImage";
import { ClipboardList, MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export function AboutSection() {
  return (
    <section className="mx-auto max-w-site px-4 py-16 md:px-8 md:py-20 lg:px-16 lg:py-24">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="relative mx-auto items-center justify-center ">
          {/* <div className="relative aspect-square w-[400px] h-[400px]"> */}
          <img
            src="/images/ayongan/about.png"
            alt="Kalash yatra procession"
            className="w-full h-full"
          />
          {/* </div> */}
          {/* <div className="grid w-full items-end gap-4">
            <div className="relative w-[150px] h-[250px]  overflow-hidden  ">
              <Image
                src="/images/ayongan/about-image-2.jpg.png"
                alt="Devotional event mandap"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative overflow-hidden ">
              <Image
                src="/images/ayongan/about-image-3.jpg.png"
                alt="Pandit reading scripture"
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
          </div> */}

          {/* <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center rounded-2xl bg-white px-6 py-3 text-center shadow-card-hover">
            <span className="font-sans text-2xl font-extrabold text-brand-saffron-400">
              10K+
            </span>
            <span className="text-xs font-medium text-text-muted">
              Happy Devotees
            </span>
          </div> */}
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="font-sans text-3xl font-bold text-text-primary md:text-6xl">
            Create Divine Experiences, Not Just Events
          </h2>
          <p className="text-base leading-relaxed text-text-muted">
            Every spiritual gathering carries emotion, devotion, and
            blessings. Whether you&apos;re organizing a Bhajan Sandhya,
            Sundarkand Path, Satsang, or any devotional celebration, we take
            care of every detail so you can focus on devotion.
          </p>

          <div className="flex flex-wrap gap-8">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-peach text-brand-saffron-400">
                <ClipboardList size={22} />
              </span>
              <div>
                <p className="font-sans text-xl font-bold text-text-primary">
                  500+
                </p>
                <p className="text-sm text-text-muted">
                  Devotional Events Organized
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-peach text-brand-saffron-400">
                <MapPin size={22} />
              </span>
              <div>
                <p className="font-sans text-xl font-bold text-text-primary">
                  25+
                </p>
                <p className="text-sm text-text-muted">Cities Served</p>
              </div>
            </div>
          </div>

          <ButtonLink href="/contact" size="lg" className="self-start rounded-full">
            Contact Us →
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
