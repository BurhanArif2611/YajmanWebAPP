"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { OtpInput } from "@/components/auth/OtpInput";
import { MOCK_USER, DEMO_PHONE } from "@/lib/constants";

export function ContactDetailsSection() {
  const [otpSent, setOtpSent] = useState(false);
  const [differentNumber, setDifferentNumber] = useState(false);
  const isLoggedIn = Boolean(MOCK_USER);
  const phone = MOCK_USER?.phone ?? DEMO_PHONE;

  return (
    <>
      <div>
        <h3 className="font-sans text-lg font-semibold text-text-primary">
          Your WhatsApp Number
        </h3>
        <p className="mt-1 text-sm text-text-muted">
          Your Puja booking updates like Puja Photos, Videos and other
          details will be sent on WhatsApp on below number.
        </p>
      </div>

      <Input
        type="tel"
        defaultValue={phone}
        readOnly={isLoggedIn}
        containerClassName="bg-white"
        leading={
          <Image src="/icons/whatsapp.png" alt="WhatsApp" width={22} height={22} />
        }
        trailing={
          !isLoggedIn &&
          !otpSent && (
            <button
              onClick={() => setOtpSent(true)}
              className="whitespace-nowrap text-sm font-semibold text-brand-saffron-400"
            >
              Send OTP
            </button>
          )
        }
      />

      {!isLoggedIn && otpSent && (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-text-primary">
            Enter OTP ({phone} )
          </p>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <OtpInput />
            <button className="text-xs font-semibold text-text-muted">
              Didn&apos;t Receive Code?{" "}
              <span className="text-brand-saffron-400">Resend OTP</span>
            </button>
          </div>
        </div>
      )}

      <Checkbox
        checked={differentNumber}
        onChange={(e) => setDifferentNumber(e.target.checked)}
        label="I have a different number for calling"
      />

      {differentNumber && (
        <Input type="tel" placeholder="+91 0000000000" containerClassName="bg-white" />
      )}
    </>
  );
}
