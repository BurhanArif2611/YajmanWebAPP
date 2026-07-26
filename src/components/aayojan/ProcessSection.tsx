import {
  CalendarCheck2,
  HeartHandshake,
  MessageSquareText,
  PartyPopper,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const STEPS = [
  {
    number: "01",
    icon: MessageSquareText,
    title: "Share Your Requirement",
    description: "Tell us about your event type, preferred date, and number of guests.",
  },
  {
    number: "02",
    icon: CalendarCheck2,
    title: "Customized Planning",
    description: "Our experts prepare a tailored plan including rituals, decoration, and schedule.",
  },
  {
    number: "03",
    icon: PartyPopper,
    title: "Event Execution",
    description: "Our experienced team manages every aspect of the event with precision.",
  },
  {
    number: "04",
    icon: HeartHandshake,
    title: "Celebrate with Peace of Mind",
    description: "Enjoy your spiritual gathering while we handle everything professionally.",
  },
];

export function ProcessSection() {
  return (
    <section className="mx-auto max-w-site px-4 py-16 md:px-8 md:py-20 lg:px-16 lg:py-24">
      <SectionHeader eyebrow="Event Process" heading="How We Organize Your Event" />

      <div className="relative mt-16 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6">
        <div className="absolute left-0 right-0 top-8 hidden items-center lg:flex">
          {STEPS.map((_, i) => (
            <div key={i} className="flex flex-1 items-center last:flex-none">
              <span className="h-2 w-2 shrink-0 rounded-full bg-brand-saffron-400" />
              {i !== STEPS.length - 1 && (
                <span className="h-px flex-1 border-t border-dashed border-border-dark" />
              )}
            </div>
          ))}
        </div>

        {STEPS.map(({ number, icon: Icon, title, description }, i) => (
          <div key={number} className="relative flex flex-col items-center gap-4 text-center">
            <div className="relative">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FDF0D5] text-brand-saffron-400 shadow-card ring-4 ring-white">
                <Icon size={28} />
              </span>
              <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-brand-saffron-400 text-xs font-bold text-white">
                {i + 1}
              </span>
            </div>
            <h3 className="font-sans text-lg font-semibold text-text-primary">
              {title}
            </h3>
            <p className="max-w-[220px] text-sm text-text-muted">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
