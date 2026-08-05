"use client";

import { Input } from "@/components/ui/Input";

export function AddressSection({
  address,
  onAddressChange,
  city,
  onCityChange,
  pincode,
  onPincodeChange,
}: {
  address: string;
  onAddressChange: (value: string) => void;
  city: string;
  onCityChange: (value: string) => void;
  pincode: string;
  onPincodeChange: (value: string) => void;
}) {
  return (
    <>
      <p className="text-sm text-text-muted">
        This puja requires a pandit to visit in person — tell us where.
      </p>

      <Input
        placeholder="Address"
        value={address}
        onChange={(e) => onAddressChange(e.target.value)}
        containerClassName="bg-white"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          placeholder="City"
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
          containerClassName="bg-white"
        />
        <Input
          type="text"
          inputMode="numeric"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) => onPincodeChange(e.target.value.replace(/\D/g, "").slice(0, 6))}
          containerClassName="bg-white"
        />
      </div>
    </>
  );
}
