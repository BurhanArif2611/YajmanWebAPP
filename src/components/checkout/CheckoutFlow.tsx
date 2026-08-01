"use client";

import { useState } from "react";
import { CollapsibleSection } from "@/components/checkout/CollapsibleSection";
import { ContactDetailsSection } from "@/components/checkout/ContactDetailsSection";
import { MembersSection } from "@/components/checkout/MembersSection";
import { GotraSection } from "@/components/checkout/GotraSection";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import type { MockService } from "@/lib/constants";
import type { ServiceAddon } from "@/types/api";

export function CheckoutFlow({
  service,
  date,
  addons,
}: {
  service: MockService;
  date?: string;
  addons: ServiceAddon[];
}) {
  const [name, setName] = useState("");
  const [callingNumber, setCallingNumber] = useState("");
  const [useDifferentNumber, setUseDifferentNumber] = useState(false);
  const [members, setMembers] = useState([""]);
  const [gotra, setGotra] = useState("");
  const [gotraUnknown, setGotraUnknown] = useState(true);

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
      </div>

      <OrderSummary
        service={service}
        date={date}
        addons={addons}
        bookingInfo={{ name, callingNumber, useDifferentNumber, members, gotra, gotraUnknown }}
      />
    </div>
  );
}
