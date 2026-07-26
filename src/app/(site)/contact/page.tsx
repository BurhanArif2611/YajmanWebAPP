import { Mail, MapPin, Phone } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Contact Us | Yajman",
  description:
    "Get in touch with Yajman for puja bookings, event planning, or support.",
};

const CONTACT_INFO = [
  {
    icon: Phone,
    label: "Call us",
    value: "+918109181057",
    href: "tel:+918109181057",
  },
  {
    icon: Mail,
    label: "Email us",
    value: "contact@yajmanapp.in",
    href: "mailto:contact@yajmanapp.in",
  },
  {
    icon: MapPin,
    label: "Visit us",
    value: "212 Satguru Parinay, AB Road, Vijay Nagar, Indore 452010",
    href: undefined,
  },
];

export default function ContactPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

      <div className="mx-auto max-w-site px-4 pb-16 md:px-8 md:pb-20 lg:px-16 lg:pb-24">
        <div className="text-center">
          <span className="font-decorative text-2xl text-brand-saffron-400 md:text-3xl">
            Contact us
          </span>
          <h1 className="mt-2 font-sans text-3xl font-semibold text-text-primary md:text-4xl">
            Get In Touch With Us
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base text-text-muted">
            Have a question about a puja, an event, or your booking? Send us
            a message and our team will get back to you shortly.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[380px_1fr]">
          <div className="flex flex-col gap-4">
            {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => {
              const content = (
                <div className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-card">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-peach text-brand-saffron-400">
                    <Icon size={20} />
                  </span>
                  <div>
                    <p className="text-sm text-text-muted">{label}</p>
                    <p className="font-sans text-base font-semibold text-text-primary">
                      {value}
                    </p>
                  </div>
                </div>
              );

              return href ? (
                <a key={label} href={href}>
                  {content}
                </a>
              ) : (
                <div key={label}>{content}</div>
              );
            })}
          </div>

          <form className="flex flex-col gap-5 rounded-2xl bg-surface-peach p-6 md:p-10">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Name">
                <Input placeholder="Enter your name" containerClassName="bg-white" />
              </Field>
              <Field label="Email">
                <Input type="email" placeholder="Enter your email" containerClassName="bg-white" />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Phone">
                <Input type="tel" placeholder="Enter your phone number" containerClassName="bg-white" />
              </Field>
              <Field label="Subject">
                <Input placeholder="How can we help?" containerClassName="bg-white" />
              </Field>
            </div>

            <Field label="Message">
              <textarea
                rows={5}
                placeholder="Tell us more about your requirement..."
                className="w-full resize-none rounded-xl border border-border-dark bg-white p-4 text-base font-medium text-text-primary outline-none placeholder:text-text-light"
              />
            </Field>

            <Button type="submit" size="lg" className="w-full justify-center rounded-full">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-text-primary">{label}</span>
      {children}
    </label>
  );
}
