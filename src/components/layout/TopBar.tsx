import { Mail, Phone } from "lucide-react";

export function TopBar() {
  return (
    <div className="bg-brand-saffron-400 text-white">
      <div className="mx-auto flex max-w-site items-center justify-between gap-4 px-4 py-2 text-sm font-medium md:px-8 lg:px-16">
        <div className="hidden items-center gap-6 sm:flex">
          <a href="tel:+918109181057" className="inline-flex items-center gap-2">
            <Phone size={14} />
            Call Us: +918109181057
          </a>
          <a
            href="mailto:contact@yajmanapp.in"
            className="inline-flex items-center gap-2"
          >
            <Mail size={14} />
            contact@yajmanapp.in
          </a>
        </div>
        <p className="w-full text-center sm:w-auto sm:text-right">
          Save Extra 10% on all Prepaid Offers
        </p>
      </div>
    </div>
  );
}
