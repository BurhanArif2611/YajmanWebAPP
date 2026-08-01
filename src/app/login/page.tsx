"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { sendOtp } from "@/lib/api/auth";
import { ApiError } from "@/lib/apiError";
import { DEMO_PHONE } from "@/lib/constants";

function digitsOnly(phone: string) {
  return phone.replace(/\D/g, "").slice(-10);
}

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState(DEMO_PHONE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendOtp = async () => {
    const phoneDigits = digitsOnly(phone);
    if (phoneDigits.length !== 10) {
      setError("Enter a valid 10-digit phone number.");
      return;
    }

    setError(null);
    setLoading(true);
    try {
      await sendOtp(phoneDigits);
      router.push(`/verify-otp?phone=${encodeURIComponent(phoneDigits)}`);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(
          err.isRateLimited
            ? "Too many attempts. Please wait a few minutes and try again."
            : err.message
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div>
        <h1 className="font-sans text-3xl font-bold text-text-primary md:text-4xl">
          Login to Book Your Puja
        </h1>
        <p className="mt-3 text-base text-text-muted">
          Please login with the same number that you used for registration.
        </p>
      </div>

      <Input
        type="tel"
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
          setError(null);
        }}
        placeholder="+91 00000 00000"
        leading={
          <Image src="/icons/whatsapp.png" alt="WhatsApp" width={22} height={22} />
        }
      />

      {error && <p className="text-sm font-medium text-error">{error}</p>}

      <Button
        size="lg"
        className="w-full justify-center rounded-full"
        onClick={handleSendOtp}
        disabled={loading}
      >
        {loading ? "Sending..." : "Send OTP"}
      </Button>

      <p className="text-center text-sm text-text-muted">
        By Continuing, You Agree To Our Terms Of Service And Privacy Policy
      </p>
    </AuthLayout>
  );
}
