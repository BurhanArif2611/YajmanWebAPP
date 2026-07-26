"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/Button";
import { OtpInput } from "@/components/auth/OtpInput";
import { useAuth } from "@/hooks/useAuth";
import { DEMO_PHONE } from "@/lib/constants";

function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const phone = searchParams.get("phone") ?? DEMO_PHONE;

  const handleVerify = () => {
    login(phone);
    router.push("/profile");
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

      <OtpInput />

      <Button size="lg" className="w-full justify-center rounded-full" onClick={handleVerify}>
        Verify
      </Button>

      <p className="text-center text-sm text-text-muted">
        Didn&apos;t Receive Code?{" "}
        <button className="font-semibold text-brand-saffron-400">
          Resend OTP
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
