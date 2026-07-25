import { Mail, MapPin, Phone } from "lucide-react";
import { FOOTER_LINKS } from "@/lib/constants";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/components/ui/SocialIcons";

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="mx-auto max-w-site px-4 py-16 md:px-8 lg:px-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 flex flex-col gap-4 sm:col-span-3 lg:col-span-1">
            <span className="font-sans text-2xl font-extrabold text-white">
              yajman
            </span>
            <p className="text-sm text-white/70">
              This service has taken my business to a whole new level. The
              design and functionality are both outstanding and user
              friendly.
            </p>
            <div className="flex items-center gap-3">
              {[FacebookIcon, TwitterIcon, YoutubeIcon, InstagramIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-brand-saffron-400"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn heading="Our Services" links={FOOTER_LINKS.services} />
          <FooterColumn heading="Quick Links" links={FOOTER_LINKS.quickLinks} />
          <FooterColumn heading="Terms" links={FOOTER_LINKS.terms} />

          <div className="flex flex-col gap-4">
            <h3 className="font-sans text-base font-semibold">Contact</h3>
            <div className="flex items-start gap-2 text-sm text-white/70">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <span>212 Satguru Parinay, AB Road, Vijay Nagar, Indore 452010</span>
            </div>
            <a
              href="tel:+918109181057"
              className="flex items-center gap-2 text-sm text-white/70 hover:text-white"
            >
              <Phone size={16} />
              +918109181057
            </a>
            <a
              href="mailto:contact@yajmanapp.in"
              className="flex items-center gap-2 text-sm text-white/70 hover:text-white"
            >
              <Mail size={16} />
              contact@yajmanapp.in
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-site flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-white/60 sm:flex-row md:px-8 lg:px-16">
          <p>Copyright © 2026 Yajman. All rights reserved</p>
          <p className="text-xs">Secure payments · UPI · Cards · NetBanking</p>
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
      <h3 className="font-sans text-base font-semibold">{heading}</h3>
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
