import { Mail, Phone } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function SupportSection() {
  return (
    <section className="bg-surface-peach">
      <div className="mx-auto max-w-site px-4 py-10 text-center md:px-8 md:py-16 lg:px-16">
        <SectionHeader
          eyebrow="our support team"
          heading="We're here to help!"
          subtitle="Connect with our expert travel consultants to plan your next trip."
        />

        <div className="mt-6 flex flex-col items-center justify-center gap-5 sm:mt-10 sm:flex-row sm:gap-16">
          <div className="flex items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand-saffron-400 shadow-card">
              <Phone size={22} />
            </span>
            <div className="text-left">
              <p className="text-sm text-text-muted">Call us:</p>
              <a
                href="tel:+918109181057"
                className="font-sans text-xl font-semibold text-text-primary hover:text-brand-saffron-400"
              >
                +918109181057
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand-saffron-400 shadow-card">
              <Mail size={22} />
            </span>
            <div className="text-left">
              <p className="text-sm text-text-muted">Email us:</p>
              <a
                href="mailto:contact@yajmanapp.in"
                className="font-sans text-xl font-semibold text-text-primary hover:text-brand-saffron-400"
              >
                contact@yajmanapp.in
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
