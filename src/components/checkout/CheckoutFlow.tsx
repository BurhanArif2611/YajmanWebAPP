"use client";

import { useState } from "react";
import { CollapsibleSection } from "@/components/checkout/CollapsibleSection";
import { ContactDetailsSection } from "@/components/checkout/ContactDetailsSection";
import { MembersSection } from "@/components/checkout/MembersSection";
import { GotraSection } from "@/components/checkout/GotraSection";
import { AddressSection } from "@/components/checkout/AddressSection";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import type { MockService } from "@/lib/constants";
import type { ServiceAddon } from "@/types/api";

export function CheckoutFlow({
  service,
  date,
  addons,
  requiresPandit,
}: {
  service: MockService;
  date?: string;
  addons: ServiceAddon[];
  requiresPandit: boolean;
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
        date={date}
        addons={addons}
        requiresPandit={requiresPandit}
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
