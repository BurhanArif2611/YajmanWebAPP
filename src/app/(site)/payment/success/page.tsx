import { PaymentStatusCard } from "@/components/payment/PaymentStatusCard";

export default function PaymentSuccessPage() {
  return (
    <PaymentStatusCard
      variant="success"
      referenceNumber="000085752257"
      date="Mar 22, 2023"
      time="07:80 AM"
      paymentMethod="Credit Card"
      amount={799}
    />
  );
}
