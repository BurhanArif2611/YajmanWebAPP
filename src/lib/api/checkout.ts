import { apiFetch } from "@/lib/fetch";
import type {
  CreateOrderPayload,
  CreateOrderResponse,
  VerifyPaymentPayload,
} from "@/types/api";

export function createOrder(payload: CreateOrderPayload) {
  return apiFetch<CreateOrderResponse>("/checkout/create-order", {
    method: "POST",
    auth: true,
    body: payload,
  });
}

export function verifyPayment(payload: VerifyPaymentPayload) {
  return apiFetch<{ status: string }>("/checkout/verify-payment", {
    method: "POST",
    auth: true,
    body: payload,
  });
}
