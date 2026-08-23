"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "@/components/ui/AppImage";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { sendOtp } from "@/lib/api/auth";
import { ApiError } from "@/lib/apiError";
import { digitsOnly } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendOtp = async () => {
    const phoneDigits = digitsOnly(phone);
    if (!phone.trim()) {
      setError("Enter your phone number.");
      return;
    }
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

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void handleSendOtp();
        }}
        className="flex flex-col gap-6"
        noValidate
      >
        <div>
          <Input
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setError(null);
            }}
            placeholder="+91 00000 00000"
            error={Boolean(error)}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "login-phone-error" : undefined}
            leading={
              <Image src="/icons/whatsapp.png" alt="WhatsApp" width={22} height={22} />
            }
          />
          {error ? (
            <p id="login-phone-error" className="mt-2 text-sm font-medium text-error">
              {error}
            </p>
          ) : null}
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full justify-center rounded-full"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send OTP"}
        </Button>
      </form>

      <p className="text-center text-sm text-text-muted">
        By Continuing, You Agree To Our Terms Of Service And Privacy Policy
      </p>
    </AuthLayout>
  );
}
