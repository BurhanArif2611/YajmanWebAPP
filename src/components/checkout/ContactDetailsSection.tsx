"use client";

import { useEffect, useState } from "react";
import Image from "@/components/ui/AppImage";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { OtpInput } from "@/components/auth/OtpInput";
import { useAuth } from "@/hooks/useAuth";
import { sendOtp, verifyOtp } from "@/lib/api/auth";
import { persistDeviceToken, resolveDeviceToken } from "@/lib/deviceToken";
import { setSession } from "@/lib/auth";
import { ApiError } from "@/lib/apiError";
import { digitsOnly } from "@/lib/utils";

const RESEND_COOLDOWN = 30;

export function ContactDetailsSection({
  name,
  onNameChange,
  callingNumber,
  onCallingNumberChange,
  useDifferentNumber,
  onUseDifferentNumberChange,
  specialInstructions,
  onSpecialInstructionsChange,
}: {
  name: string;
  onNameChange: (value: string) => void;
  callingNumber: string;
  onCallingNumberChange: (value: string) => void;
  useDifferentNumber: boolean;
  onUseDifferentNumberChange: (value: boolean) => void;
  specialInstructions: string;
  onSpecialInstructionsChange: (value: string) => void;
}) {
  const { isLoggedIn, phone: authPhone } = useAuth();
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const id = setInterval(() => setResendCooldown((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [resendCooldown]);

  const displayPhone = isLoggedIn ? authPhone ?? "" : phone;

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
    setSending(true);
    try {
      await sendOtp(phoneDigits);
      setOtpSent(true);
      setResendCooldown(RESEND_COOLDOWN);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't send OTP. Try again.");
    } finally {
      setSending(false);
    }
  };

  const handleVerify = async (code: string) => {
    setError(null);
    setVerifying(true);
    try {
      const deviceToken = await resolveDeviceToken();
      const result = await verifyOtp(digitsOnly(phone), code, "+91", { deviceToken });
      if (deviceToken) persistDeviceToken(deviceToken);
      setSession(
        {
          access_token: result.access_token,
          refresh_token: result.refresh_token,
          expires_in: result.expires_in,
        },
        result.user
      );
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Invalid OTP. Try again.");
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setError(null);
    try {
      await sendOtp(digitsOnly(phone));
      setResendCooldown(RESEND_COOLDOWN);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't resend the code.");
    }
  };

  return (
    <>
      <div>
        <h3 className="font-sans text-lg font-semibold text-text-primary">
          Your Name
        </h3>
      </div>
      <Input
        type="text"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="Full name"
        containerClassName="bg-white"
      />

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
        key={isLoggedIn ? "locked" : "editable"}
        type="tel"
        value={displayPhone}
        onChange={(e) => {
          setPhone(e.target.value);
          setError(null);
        }}
        readOnly={isLoggedIn || otpSent}
        placeholder="+91 00000 00000"
        error={Boolean(error) && !otpSent}
        containerClassName="bg-white"
        leading={
          <Image src="/icons/whatsapp.png" alt="WhatsApp" width={22} height={22} />
        }
        trailing={
          !isLoggedIn &&
          !otpSent && (
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={sending}
              className="whitespace-nowrap text-sm font-semibold text-brand-saffron-400 disabled:text-text-light"
            >
              {sending ? "Sending..." : "Send OTP"}
            </button>
          )
        }
      />

      {error ? <p className="text-sm font-medium text-error">{error}</p> : null}

      {!isLoggedIn && otpSent && (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-text-primary">
            Enter OTP ({phone})
          </p>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <OtpInput onComplete={handleVerify} disabled={verifying} error={Boolean(error)} />
            <button
              onClick={handleResend}
              disabled={resendCooldown > 0}
              className="text-xs font-semibold text-text-muted disabled:text-text-light"
            >
              {resendCooldown > 0 ? (
                `Resend OTP (${resendCooldown}s)`
              ) : (
                <>
                  Didn&apos;t Receive Code?{" "}
                  <span className="text-brand-saffron-400">Resend OTP</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <Checkbox
        checked={useDifferentNumber}
        onChange={(e) => onUseDifferentNumberChange(e.target.checked)}
        label="I have a different number for calling"
      />

      {useDifferentNumber && (
        <Input
          type="tel"
          value={callingNumber}
          onChange={(e) => onCallingNumberChange(e.target.value)}
          placeholder="+91 0000000000"
          containerClassName="bg-white"
        />
      )}

      <div>
        <h3 className="font-sans text-lg font-semibold text-text-primary">
          Special Instructions
        </h3>
        <p className="mt-1 text-sm text-text-muted">
          Anything else the pandit or our team should know? (optional)
        </p>
      </div>
      <textarea
        value={specialInstructions}
        onChange={(e) => onSpecialInstructionsChange(e.target.value)}
        placeholder="E.g. gate code, preferred language, allergies..."
        rows={3}
        className="w-full resize-none rounded-md border border-border-dark bg-white p-4 text-base font-medium text-text-primary outline-none placeholder:text-text-light"
      />
    </>
  );
}
