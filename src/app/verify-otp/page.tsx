"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/Button";
import { OtpInput } from "@/components/auth/OtpInput";
import { verifyOtp, sendOtp } from "@/lib/api/auth";
import { setSession } from "@/lib/auth";
import { ApiError } from "@/lib/apiError";
import { digitsOnly } from "@/lib/utils";

const RESEND_COOLDOWN = 30;

function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = digitsOnly(searchParams.get("phone"));

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(RESEND_COOLDOWN);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const id = setInterval(() => setResendCooldown((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [resendCooldown]);

  const handleVerify = async (code: string = otp) => {
    if (!phone) {
      setError("Phone number is missing. Go back and request a new OTP.");
      return;
    }
    if (!code.trim() || code.length !== 6) {
      setError("Enter the 6-digit code sent to your phone.");
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const result = await verifyOtp(phone, code);
      setSession(
        {
          access_token: result.access_token,
          refresh_token: result.refresh_token,
          expires_in: result.expires_in,
        },
        result.user
      );
      router.push("/profile");
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || resending) return;
    setResending(true);
    setError(null);
    try {
      if (!phone) {
        setError("Phone number is missing. Go back and request a new OTP.");
        return;
      }
      await sendOtp(phone);
      setResendCooldown(RESEND_COOLDOWN);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Couldn't resend the code. Try again shortly."
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <AuthLayout backHref="/login">
      <div>
        <h1 className="font-sans text-3xl font-bold text-text-primary md:text-4xl">
          Enter OTP
        </h1>
        <p className="mt-3 text-base text-text-muted">
          OTP Code is sent to{" "}
          <span className="font-semibold text-text-primary">{phone}</span>
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void handleVerify();
        }}
        className="flex flex-col gap-6"
        noValidate
      >
        <div>
          <OtpInput
            onChange={(value) => {
              setOtp(value);
              setError(null);
            }}
            onComplete={handleVerify}
            error={Boolean(error)}
            disabled={loading}
          />
          {error ? (
            <p className="mt-2 text-sm font-medium text-error">{error}</p>
          ) : null}
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full justify-center rounded-full"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify"}
        </Button>
      </form>

      <p className="text-center text-sm text-text-muted">
        Didn&apos;t Receive Code?{" "}
        <button
          onClick={handleResend}
          disabled={resendCooldown > 0 || resending}
          className="font-semibold text-brand-saffron-400 disabled:text-text-light"
        >
          {resendCooldown > 0 ? `Resend OTP (${resendCooldown}s)` : "Resend OTP"}
        </button>
      </p>
    </AuthLayout>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={null}>
      <VerifyOtpForm />
    </Suspense>
  );
}
