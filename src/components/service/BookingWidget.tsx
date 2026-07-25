import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { DatePickerField } from "@/components/service/DatePickerField";
import type { MockService } from "@/lib/constants";

export function BookingWidget({ service }: { service: MockService }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl bg-white p-6 shadow-card">
        <h2 className="font-sans text-2xl font-semibold text-text-primary">
          About this Puja
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-text-muted">
          Discover the perfect escape with our carefully curated travel
          packages. Whether you&apos;re seeking adventure, relaxation, or
          cultural discovery, our tours are designed to offer unforgettable
          experiences. Explore breath-taking landscapes, meet friendly
          locals, and create lasting memories in some of the world&apos;s
          most stunning destinations.
        </p>

        <div className="mt-5 flex items-baseline gap-2">
          <span className="text-2xl font-semibold text-text-primary">
            ₹{service.price}
          </span>
          <span className="text-sm text-text-light line-through">
            ₹{service.originalPrice}
          </span>
          <span className="text-sm font-medium text-success">
            -{service.discountPercent}%
          </span>
        </div>

        <div className="mt-4">
          <DatePickerField />
        </div>

        <Button size="lg" className="mt-4 w-full justify-center rounded-full">
          Select Date &amp; Book Now
        </Button>
      </div>

      <div className="flex items-center gap-4 text-sm font-medium text-text-light">
        <span className="h-px flex-1 bg-border" />
        Or
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="flex flex-col items-center gap-2 rounded-2xl bg-surface-peach p-6 text-center">
        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-white shadow-card">
          <Image
            src="/images/logo/logo.svg"
            alt="Yajman"
            fill
            sizes="48px"
            className="object-contain p-1.5"
          />
        </div>
        <p className="font-sans text-lg font-semibold text-text-primary">
          Yajman Support
        </p>
        <p className="text-sm text-text-muted">
          Need help? Talk to an expert.
        </p>
        <a
          href="https://wa.me/910255456235"
          className="flex items-center gap-2 font-sans text-xl font-semibold text-text-primary"
        >
          <Image
            src="/images/misc/whatsapp-icon.png"
            alt="WhatsApp"
            width={20}
            height={20}
          />
          + 0255 456 235
        </a>
      </div>
    </div>
  );
}
