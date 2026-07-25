import { CollapsibleSection } from "@/components/checkout/CollapsibleSection";
import { ContactDetailsSection } from "@/components/checkout/ContactDetailsSection";
import { MembersSection } from "@/components/checkout/MembersSection";
import { GotraSection } from "@/components/checkout/GotraSection";
import { OrderSummary } from "@/components/checkout/OrderSummary";

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-site px-4 py-10 md:px-8 lg:px-16 lg:py-8">
      <h1 className="font-sans text-4xl font-bold text-text-primary">
        Checkout
      </h1>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
        <div className="flex flex-col gap-6">
          <CollapsibleSection title="Contact Details">
            <ContactDetailsSection />
          </CollapsibleSection>

          <CollapsibleSection title="Name of members participating in Puja">
            <MembersSection />
          </CollapsibleSection>

          <CollapsibleSection title="Fill participant's gotra">
            <GotraSection />
          </CollapsibleSection>
        </div>

        <OrderSummary />
      </div>
    </div>
  );
}
