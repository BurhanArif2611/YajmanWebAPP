import { apiFetch, apiFetchPaginated } from "@/lib/fetch";
import type {
  Booking,
  BookingDetail,
  BookingInvoice,
  BookingListFilters,
  ReviewSubmission,
} from "@/types/api";

export function getBookings(filters: BookingListFilters = {}) {
  return apiFetchPaginated<Booking[]>("/bookings", {
    auth: true,
    query: {
      page: filters.page,
      limit: filters.limit,
      status: filters.status,
    },
  });
}

export function getBookingById(id: string) {
  return apiFetch<BookingDetail>(`/bookings/${id}`, { auth: true });
}

export function cancelBooking(id: string, reason: string) {
  return apiFetch<Booking>(`/bookings/${id}/cancel`, {
    method: "PATCH",
    auth: true,
    body: { reason },
  });
}

export function getBookingInvoice(id: string) {
  return apiFetch<BookingInvoice>(`/bookings/${id}/invoice`, { auth: true });
}

export function submitReview(id: string, formData: FormData) {
  return apiFetch<ReviewSubmission>(`/bookings/${id}/review`, {
    method: "POST",
    auth: true,
    isFormData: true,
    body: formData,
  });
}
