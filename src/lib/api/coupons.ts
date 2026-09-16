import { apiFetch } from "@/lib/fetch";
import type { Coupon, CouponValidation } from "@/types/api";

export function getCoupons(serviceId?: string) {
  const query = serviceId ? `?service_id=${encodeURIComponent(serviceId)}` : "";
  return apiFetch<Coupon[]>(`/coupons${query}`, { auth: true });
}

export function validateCoupon(
  code: string,
  amount: number,
  serviceId: string,
  quantity = 1
) {
  return apiFetch<CouponValidation>("/coupons/validate", {
    method: "POST",
    auth: true,
    body: { code, amount, service_id: serviceId, quantity },
  });
}
