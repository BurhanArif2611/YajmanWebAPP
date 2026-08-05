import Link from "next/link";
import { CheckoutFlow } from "@/components/checkout/CheckoutFlow";
import { getServiceBySlug } from "@/lib/api/services";
import { mapServiceToCard } from "@/lib/mappers/service";

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const slug = first(params.slug);
  const date = first(params.date);

  const detail = slug
    ? await getServiceBySlug(slug).catch(() => null)
    : null;

  return (
    <div className="mx-auto max-w-site px-4 py-10 md:px-8 lg:px-16 lg:py-8">
      <h1 className="font-sans text-4xl font-bold text-text-primary">
        Checkout
      </h1>

      {detail ? (
        <CheckoutFlow
          service={mapServiceToCard(detail)}
          date={date}
          addons={detail.is_addon_available ? detail.addons : []}
          requiresPandit={detail.requires_pandit}
        />
      ) : (
        <p className="mt-8 text-text-muted">
          No service selected for checkout.{" "}
          <Link href="/services" className="font-semibold text-brand-saffron-400">
            Browse services
          </Link>{" "}
          to pick one.
        </p>
      )}
    </div>
  );
}
