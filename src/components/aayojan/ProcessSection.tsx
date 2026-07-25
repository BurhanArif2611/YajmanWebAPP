import {
  CalendarCheck2,
  HeartHandshake,
  MessageSquareText,
  PartyPopper,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const STEPS = [
  {
    icon: MessageSquareText,
    title: "Share Your Requirement",
    description: "Tell us about your event type, preferred date, and number of guests.",
  },
  {
    icon: CalendarCheck2,
    title: "Customized Planning",
    description: "Our experts prepare a tailored plan including rituals, decoration, and schedule.",
  },
  {
    icon: PartyPopper,
    title: "Event Execution",
    description: "Our experienced team manages every aspect of the event with precision.",
  },
  {
    icon: HeartHandshake,
    title: "Celebrate with Peace of Mind",
    description: "Enjoy your spiritual gathering while we handle everything professionally.",
  },
];

export function ProcessSection() {
  return (
    <section className="mx-auto max-w-site px-4 py-16 md:px-8 md:py-20 lg:px-16 lg:py-24">
      <SectionHeader eyebrow="Event Process" heading="How We Organize Your Event" />

      <div className="relative mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="absolute left-0 right-0 top-9 hidden border-t border-dashed border-border-dark lg:block" />
        {STEPS.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="relative flex flex-col items-center gap-3 rounded-2xl bg-surface-muted p-6 text-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand-saffron-400 shadow-card">
              <Icon size={26} />
            </span>
            <h3 className="font-sans text-lg font-semibold text-text-primary">
              {title}
            </h3>
            <p className="text-sm text-text-muted">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
