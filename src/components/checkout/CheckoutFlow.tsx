"use client";

import { useMemo, useState } from "react";
import { parseISO } from "date-fns";
import { CollapsibleSection } from "@/components/checkout/CollapsibleSection";
import { ContactDetailsSection } from "@/components/checkout/ContactDetailsSection";
import { MembersSection } from "@/components/checkout/MembersSection";
import { GotraSection } from "@/components/checkout/GotraSection";
import { AddressSection } from "@/components/checkout/AddressSection";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import type { MockService } from "@/lib/constants";
import { BOOKING_QUANTITY_STORAGE_KEY } from "@/lib/bookingPreferences";
import { getBookingDateConstraints, isBookingUnavailable, type BookingAvailability } from "@/lib/bookingDates";
import type { ServiceAddon } from "@/types/api";

function parseInitialDate(value?: string) {
  if (!value) return undefined;
  const parsed = parseISO(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

function clampQuantity(value: number, max: number) {
  if (!Number.isFinite(value) || value < 1) return 1;
  return Math.min(Math.floor(value), max);
}

function readStoredQuantity() {
  try {
    const raw = sessionStorage.getItem(BOOKING_QUANTITY_STORAGE_KEY);
    return raw ? Number(raw) : 0;
  } catch {
    return 0;
  }
}

export function CheckoutFlow({
  service,
  initialDate,
  initialQuantity,
  bookingAvailability,
  addons,
  requiresPandit,
  requiresBookingTime,
}: {
  service: MockService;
  initialDate?: string;
  initialQuantity?: number;
  bookingAvailability: BookingAvailability;
  addons: ServiceAddon[];
  requiresPandit: boolean;
  requiresBookingTime: boolean;
}) {
  const [name, setName] = useState("");
  const [callingNumber, setCallingNumber] = useState("");
  const [useDifferentNumber, setUseDifferentNumber] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [members, setMembers] = useState([""]);
  const [gotra, setGotra] = useState("");
  const [gotraUnknown, setGotraUnknown] = useState(true);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [bookingDate, setBookingDate] = useState<Date | undefined>(() =>
    parseInitialDate(initialDate)
  );
  const allowQuantity = Boolean(service.allowQuantity);
  const maxQuantity = service.maxQuantity ?? 10;
  const [quantity, setQuantity] = useState(() => {
    if (!allowQuantity) return 1;
    return clampQuantity(initialQuantity || readStoredQuantity() || 1, maxQuantity);
  });

  const dateConstraints = useMemo(
    () => getBookingDateConstraints(bookingAvailability),
    [bookingAvailability]
  );
  const bookingUnavailable = useMemo(
    () => isBookingUnavailable(bookingAvailability),
    [bookingAvailability]
  );

  return (
    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
      <div className="flex flex-col gap-6">
        <CollapsibleSection title="Contact Details">
          <ContactDetailsSection
            name={name}
            onNameChange={setName}
            callingNumber={callingNumber}
            onCallingNumberChange={setCallingNumber}
            useDifferentNumber={useDifferentNumber}
            onUseDifferentNumberChange={setUseDifferentNumber}
            specialInstructions={specialInstructions}
            onSpecialInstructionsChange={setSpecialInstructions}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Name of members participating in Puja">
          <MembersSection members={members} onChange={setMembers} />
        </CollapsibleSection>

        <CollapsibleSection title="Fill participant's gotra">
          <GotraSection
            gotra={gotra}
            onGotraChange={setGotra}
            unknown={gotraUnknown}
            onUnknownChange={setGotraUnknown}
          />
        </CollapsibleSection>

        {requiresPandit && (
          <CollapsibleSection title="Address Details">
            <AddressSection
              address={address}
              onAddressChange={setAddress}
              city={city}
              onCityChange={setCity}
              pincode={pincode}
              onPincodeChange={setPincode}
            />
          </CollapsibleSection>
        )}
      </div>

      <OrderSummary
        service={service}
        bookingDate={bookingDate}
        onBookingDateChange={setBookingDate}
        quantity={quantity}
        onQuantityChange={setQuantity}
        dateConstraints={dateConstraints}
        bookingUnavailable={bookingUnavailable}
        addons={addons}
        requiresPandit={requiresPandit}
        requiresBookingTime={requiresBookingTime}
        bookingInfo={{
          name,
          callingNumber,
          useDifferentNumber,
          members,
          gotra,
          gotraUnknown,
          address,
          city,
          pincode,
          specialInstructions,
        }}
      />
    </div>
  );
}
