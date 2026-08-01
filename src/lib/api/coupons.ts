import { apiFetch } from "@/lib/fetch";
import type { Coupon, CouponValidation } from "@/types/api";

export function getCoupons() {
  return apiFetch<Coupon[]>("/coupons", { auth: true });
}

export function validateCoupon(code: string, amount: number, serviceId?: string) {
  return apiFetch<CouponValidation>("/coupons/validate", {
    method: "POST",
    auth: true,
    body: { code, amount, service_id: serviceId },
  });
}
