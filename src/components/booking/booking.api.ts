import { api } from "@/lib/api";
import type {
	AvailabilityResponse,
	Bay,
	Booking,
	BookingType,
	CreateBookingPayload,
} from "@/types";

export const getBays = async () => {
	const { data } = await api.get<Bay[]>("/bays");
	return data;
};

export const getBookingTypes = async () => {
	const { data } = await api.get<BookingType[]>("/booking-types");
	return data;
};

export const getAvailability = async (params: {
	bay: string;
	bookingType: string;
	date: string;
	durationMinutes: number;
}) => {
	const { data } = await api.get<AvailabilityResponse>(
		"/bookings/availability",
		{ params }
	);
	return data;
};

export const createBooking = async (booking: CreateBookingPayload) => {
	const { data } = await api.post<Booking>("/bookings", booking);
	return data;
};

export const getMyBookings = async () => {
	const { data } = await api.get<Booking[]>("/bookings/me");
	return data;
};

export const cancelBooking = async (id: string) => {
	const { data } = await api.patch<Booking>(`/bookings/${id}/cancel`);
	return data;
};
