"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Clock, Download, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Variant = "success" | "failed" | "pending";

const VARIANT_CONFIG = {
  success: {
    bg: "bg-success/10",
    iconBg: "bg-success/20",
    iconFg: "bg-success",
    icon: Check,
    title: "Payment Success!",
    subtitle: "Your Payment has been successfully processed",
  },
  failed: {
    bg: "bg-error/10",
    iconBg: "bg-error/20",
    iconFg: "bg-error",
    icon: X,
    title: "Payment Failed!",
    subtitle: "Your Payment could not be processed",
  },
  pending: {
    bg: "bg-warning/10",
    iconBg: "bg-warning/20",
    iconFg: "bg-warning",
    icon: Clock,
    title: "Payment Pending",
    subtitle: "Your payment is being processed, please wait",
  },
} as const;

export function PaymentStatusCard({
  variant,
  referenceNumber,
  date,
  time,
  paymentMethod,
  amount,
  redirectSeconds = 53,
}: {
  variant: Variant;
  referenceNumber: string;
  date: string;
  time: string;
  paymentMethod?: string;
  amount: number;
  redirectSeconds?: number;
}) {
  const config = VARIANT_CONFIG[variant];
  const Icon = config.icon;
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(redirectSeconds);

  useEffect(() => {
    if (variant === "pending") return;

    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          router.push("/");
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [router, variant]);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-site items-center justify-center px-4 py-16">
      <div
        className={cn(
          "w-full max-w-[560px] rounded-2xl p-8 text-center  md:p-12",
          config.bg
        )}
      >
        <div className={cn("mx-auto flex h-28 w-28 items-center justify-center rounded-full", config.iconBg)}>
          <span className={cn("flex h-16 w-16 items-center justify-center rounded-full", config.iconFg)}>
            <Icon size={32} className="text-white" strokeWidth={2.5} />
          </span>
        </div>

        <h1 className="mt-6 font-sans text-3xl font-semibold text-text-primary">
          {config.title}
        </h1>
        <p className="mt-2 text-sm text-text-muted">{config.subtitle}</p>

        <div className="mt-6 border-t border-dashed border-border-dark pt-6">
          <div className="flex flex-col gap-3 text-left text-sm">
            <Row label="References Number" value={referenceNumber} />
            <Row label="Date" value={date} />
            <Row label="Time" value={time} />
            {paymentMethod && <Row label="Payment Method" value={paymentMethod} />}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-dashed border-border-dark pt-4 text-left">
          <span className="text-sm text-text-muted">Amount</span>
          <span className="font-sans text-lg font-semibold text-text-primary">
            ₹{amount.toFixed(2)}
          </span>
        </div>

        <div className="mt-6">
          {variant === "success" && (
            <Button
              variant="outline"
              size="lg"
              className="w-full justify-center gap-2 rounded-full border-border-dark bg-white text-text-primary hover:bg-surface-muted"
            >
              <Download size={18} />
              Get PDF Receipt
            </Button>
          )}
          {variant === "failed" && (
            <Button
              variant="dark"
              size="lg"
              className="w-full justify-center rounded-full"
            >
              Retry payment
            </Button>
          )}
          {variant === "pending" && (
            <Button
              size="lg"
              className="w-full justify-center gap-2 rounded-full"
              onClick={() => router.refresh()}
            >
              <RefreshCw size={18} />
              Refresh Status
            </Button>
          )}
        </div>

        {variant !== "pending" && (
          <p className="mt-4 text-xs text-text-muted">
            You will be redirected to home in{" "}
            <span className="font-semibold text-text-primary">
              {String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:
              {String(secondsLeft % 60).padStart(2, "0")}
            </span>{" "}
            sec
          </p>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-text-muted">{label}</span>
      <span className="font-medium text-text-primary">{value}</span>
    </div>
  );
}
