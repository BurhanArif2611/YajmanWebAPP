import { PaymentStatusCard } from "@/components/payment/PaymentStatusCard";

export default function PaymentFailedPage() {
  return (
    <PaymentStatusCard
      variant="failed"
      referenceNumber="000085752257"
      date="Mar 22, 2023"
      time="07:80 AM"
      amount={799}
    />
  );
}
