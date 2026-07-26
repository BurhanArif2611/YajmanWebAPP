import { Mail, Phone } from "lucide-react";

export const metadata = {
  title: "Support | Yajman",
};

export default function SupportPage() {
  return (
    <div className="rounded-2xl bg-surface-peach p-6 md:p-10">
      <h1 className="font-sans text-2xl font-bold text-text-primary md:text-3xl">
        Support
      </h1>
      <p className="mt-1 text-sm text-text-muted">
        Need help with a booking? Reach out to our team.
      </p>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row">
        <a
          href="tel:+918109181057"
          className="flex flex-1 items-center gap-4 rounded-xl bg-white p-6 shadow-card"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-peach text-brand-saffron-400">
            <Phone size={20} />
          </span>
          <div>
            <p className="text-sm text-text-muted">Call us</p>
            <p className="font-sans text-lg font-semibold text-text-primary">
              +918109181057
            </p>
          </div>
        </a>

        <a
          href="mailto:contact@yajmanapp.in"
          className="flex flex-1 items-center gap-4 rounded-xl bg-white p-6 shadow-card"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-peach text-brand-saffron-400">
            <Mail size={20} />
          </span>
          <div>
            <p className="text-sm text-text-muted">Email us</p>
            <p className="font-sans text-lg font-semibold text-text-primary">
              contact@yajmanapp.in
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}
