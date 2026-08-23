import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FOOTER_LINKS } from "@/lib/constants";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "@/components/ui/SocialIcons";

export function Footer() {
  return (
    <footer className="relative -mt-8 overflow-hidden rounded-t-[40px] bg-[#1f1f1f]">
      <div className="h-[60px] w-full bg-white rounded-b-2xl"></div>
      <Image src="/images/decor/decor-light.png" alt="decoration" width={200} height={200} className="absolute top-[60px] left-0 z-0 bg-no-repeat bg-left-top bg-contain bg-[length:300px_auto]" />
      <Image src="/images/decor/decor-light.png" alt="decoration" width={200} height={200} className="absolute bottom-0 right-0 z-0 bg-no-repeat bg-right-top bg-contain bg-[length:300px_auto] rotate-180" />

      <div className="relative mx-auto max-w-site px-4 pb-16 pt-14 md:px-8 lg:px-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 flex flex-col gap-4 sm:col-span-3 lg:col-span-1">
            <Link href="/" aria-label="Yajman home" className="inline-block w-fit">
              <Image
                src="/images/logo/logo-white.svg"
                alt="Yajman"
                width={100}
                height={100}
              />
            </Link>
            <p className="text-sm text-white/70">
              This service has taken my business to a whole new level. The
              design and functionality and user friendly.
            </p>
            <div className="flex items-center gap-4">
              {[FacebookIcon, YoutubeIcon, InstagramIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-white/80 transition-colors hover:text-brand-saffron-400"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn heading="Our Services" links={FOOTER_LINKS.services} />
          <FooterColumn heading="Quick Links" links={FOOTER_LINKS.quickLinks} />
          <FooterColumn heading="Terms" links={FOOTER_LINKS.terms} />

          <div className="col-span-2 flex min-w-0 flex-col gap-4 sm:col-span-1">
            <h3 className="font-sans text-base font-semibold text-white">Contact</h3>
            <a
              href="tel:+918109181057"
              className="flex min-w-0 items-center gap-2 text-sm text-white/70 hover:text-white"
            >
              <Phone size={16} className="shrink-0 text-brand-saffron-400" />
              <span className="break-all">+918109181057</span>
            </a>
            <a
              href="mailto:contact@yajmanapp.in"
              className="flex min-w-0 items-start gap-2 text-sm text-white/70 hover:text-white"
            >
              <Mail size={16} className="mt-0.5 shrink-0 text-brand-saffron-400" />
              <span className="break-all">contact@yajmanapp.in</span>
            </a>
            <div className="flex min-w-0 items-start gap-2 text-sm text-white/70">
              <MapPin size={16} className="mt-0.5 shrink-0 text-brand-saffron-400" />
              <span className="break-words">
                212 सतगुरु परिणय, एबी रोड, विजय नगर, इंदौर 452010
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-site items-center px-4 py-6 text-sm text-white/60 md:px-8 lg:px-16">
          <p>
            Copyright © 2026 <span className="font-semibold text-white">Yajman</span>.
            All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  heading,
  links,
}: {
  heading: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-sans text-base font-semibold text-white">{heading}</h3>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
