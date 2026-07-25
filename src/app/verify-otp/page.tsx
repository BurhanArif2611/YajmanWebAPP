import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/Button";
import { OtpInput } from "@/components/auth/OtpInput";

export default function VerifyOtpPage() {
  return (
    <AuthLayout backHref="/login">
      <div>
        <h1 className="font-sans text-3xl font-bold text-text-primary md:text-4xl">
          Enter OTP
        </h1>
        <p className="mt-3 text-base text-text-muted">
          OTP Code is sent to{" "}
          <span className="font-semibold text-text-primary">
            +918574859556
          </span>
        </p>
      </div>

      <OtpInput />

      <Button size="lg" className="w-full justify-center rounded-full">
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
