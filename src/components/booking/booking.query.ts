import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import type { CreateBookingPayload } from "@/types";
import {
	getBays,
	getBookingTypes,
	getAvailability,
	createBooking,
	getMyBookings,
	cancelBooking,
} from "./booking.api";

export function useGetBays() {
	return useQuery({
		queryKey: ["bays"],
		queryFn: getBays,
	});
}

export function useGetBookingTypes() {
	return useQuery({
		queryKey: ["booking-types"],
		queryFn: getBookingTypes,
	});
}

export function useGetAvailability(params: {
	bay: string;
	bookingType: string;
	date: string;
	durationMinutes: number;
}) {
	return useQuery({
		queryKey: ["availability", params],
		queryFn: () => getAvailability(params),
		enabled: !!params.bay && !!params.bookingType && !!params.date,
		placeholderData: (prev) => prev,
	});
}

export function useCreateBooking() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (booking: CreateBookingPayload) => createBooking(booking),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["availability"] });
			queryClient.invalidateQueries({ queryKey: ["my-bookings"] });
		},
	});
}

export function useGetMyBookings() {
	return useQuery({
		queryKey: ["my-bookings"],
		queryFn: getMyBookings,
	});
}

export function useCancelBooking() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => cancelBooking(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["my-bookings"] });
			queryClient.invalidateQueries({ queryKey: ["availability"] });
		},
	});
}
