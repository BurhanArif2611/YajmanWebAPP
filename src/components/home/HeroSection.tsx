import Image from "next/image";
import { Search } from "lucide-react";
import {
  BookOpen,
  Calendar,
  Clock,
  Flame,
  MoreHorizontal,
  Music,
  PartyPopper,
  Sparkles,
} from "lucide-react";

const POPULAR_SEARCHES = [
  "Pandit ji at Home",
  "Brahmin Bhoj",
  "Puja at Pilgrimage",
  "Bhajan Sandhya",
];

const QUICK_LINKS = [
  { label: "Bhajan Lyrics", icon: Music },
  { label: "Festival", icon: PartyPopper },
  { label: "Tithi", icon: Calendar },
  { label: "Panchang", icon: BookOpen },
  { label: "Choghadiya", icon: Clock },
  { label: "Katha", icon: Sparkles },
  { label: "Aarti", icon: Flame },
  { label: "View More", icon: MoreHorizontal },
];

export function HeroSection() {
  return (
    <section className="relative  bg-surface-peach bg-[url(/images/hero-bg.png)] bg-cover bg-no-repeat">
      <div className="mx-auto  max-w-site gap-10 px-4 pb-20 pt-12 md:px-8  lg:px-16 lg:pb-28 lg:pt-16">
        <div className="flex flex-col pt-10 pb-10 gap-6 pl-[150px]">
          <h1 className="max-w-3xl font-sans text-3xl font-bold leading-tight text-text-primary md:text-4xl lg:text-9xl lg:leading-[1.1]">
            Connect With{" "}
            <span className="text-brand-saffron-400">Divinity.</span> Book
            Puja In Minutes
          </h1>
          <p className="text-md font-medium text-text-secondary md:text-lg">
            Verified Pandit | Authentic Rituals | Peace Of Mind
          </p>

          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="font-medium text-text-secondary">
              Popular Search:
            </span>
            {POPULAR_SEARCHES.map((tag) => (
              <a
                key={tag}
                href={`/services?search=${encodeURIComponent(tag)}`}
                className="rounded-full border border-border-dark px-3 py-1 text-text-secondary text-sm transition-colors hover:border-brand-saffron-400 hover:text-brand-saffron-400"
              >
                {tag}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-[-80px] left-0 w-[75%] right-0 mx-auto">
        <div className="mx-auto w-full max-w-site rounded-2xl bg-white p-4 shadow-card-hover md:p-6">


          <div className=" grid grid-cols-4 gap-3  sm:grid-cols-8">
            {QUICK_LINKS.map(({ label, icon: Icon }) => (
              <a
                key={label}
                href="/articles"
                className="flex flex-col items-center gap-2 text-center"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-peach text-brand-saffron-400">
                  <Icon size={20} />
                </span>
                <span className="text-xs font-semibold text-text-secondary md:text-sm">
                  {label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
