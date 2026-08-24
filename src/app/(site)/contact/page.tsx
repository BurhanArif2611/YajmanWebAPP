import { Mail, MapPin, Phone } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ContactForm } from "@/components/contact/ContactForm";

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
    value: "212 सतगुरु परिणय, एबी रोड, विजय नगर, इंदौर 452010",
    href: undefined,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} /> */}

      <div className="mx-auto max-w-site pt-8 px-4 pb-16 md:px-8 md:pb-20 lg:px-16 lg:pb-24">
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
                    <p className="break-words font-sans text-base font-semibold text-text-primary">
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

          <ContactForm />
        </div>
      </div>
    </>
  );
}
