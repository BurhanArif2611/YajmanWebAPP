"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { DEMO_PHONE } from "@/lib/constants";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState(DEMO_PHONE);

  const handleSendOtp = () => {
    router.push(`/verify-otp?phone=${encodeURIComponent(phone)}`);
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
        onChange={(e) => setPhone(e.target.value)}
        placeholder="+91 00000 00000"
        leading={
          <Image src="/icons/whatsapp.png" alt="WhatsApp" width={22} height={22} />
        }
      />

      <Button size="lg" className="w-full justify-center rounded-full" onClick={handleSendOtp}>
        Send OTP
      </Button>

      <p className="text-center text-sm text-text-muted">
        By Continuing, You Agree To Our Terms Of Service And Privacy Policy
      </p>
    </AuthLayout>
  );
}
