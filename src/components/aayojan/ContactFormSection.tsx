import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const EVENT_TYPES = [
  "Bhajan Sandhya",
  "Sundarkand Path",
  "Satsang",
  "Custom Event",
];

export function ContactFormSection() {
  return (
    <section className="mx-auto max-w-site px-4 py-16 md:px-8 md:py-20 lg:px-16 lg:py-24">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative h-72 w-full overflow-hidden rounded-[32px] md:h-[420px]">
          <Image
            src="/images/ayongan/image-3.png"
            alt="Kalash yatra procession"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="rounded-2xl bg-surface-peach p-6 md:p-10">
          <span className="font-decorative text-2xl text-brand-saffron-400">
            Contact us
          </span>
          <h2 className="mt-2 font-sans text-3xl font-semibold text-text-primary md:text-4xl">
            Get In Touch With Us !
          </h2>

          <form className="mt-8 flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Name">
                <Input placeholder="Enter name" containerClassName="bg-white" />
              </Field>
              <Field label="Number">
                <Input type="tel" placeholder="Enter number" containerClassName="bg-white" />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Email">
                <Input type="email" placeholder="Enter email" containerClassName="bg-white" />
              </Field>
              <Field label="Event">
                <div className="relative flex min-h-[56px] items-center rounded-xl border border-border-dark bg-white px-4">
                  <select className="w-full appearance-none bg-transparent text-base font-medium text-text-primary outline-none">
                    <option value="">Select event</option>
                    {EVENT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="pointer-events-none absolute right-4 text-text-muted" />
                </div>
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="City">
                <Input placeholder="Enter city" containerClassName="bg-white" />
              </Field>
              <Field label="Number Of people">
                <Input type="number" placeholder="Enter number of people" containerClassName="bg-white" />
              </Field>
            </div>

            <Button type="submit" size="lg" className="mt-2 w-full justify-center rounded-full">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </section>
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
