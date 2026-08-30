export interface Bay {
	_id: string;
	name: string;
	isActive: boolean;
}

export interface BookingType {
	_id: string;
	name: string;
	description: string;
	durationOptions: number[];
	color: string;
	hourlyPrice: number;
	isActive: boolean;
}

export interface AvailabilityResponse {
	date: string;
	duration: number;
	isClosed: boolean;
	slots: string[];
}

export interface Booking {
	_id: string;
	// null when the referenced bay/booking type has since been deleted
	bay: { _id: string; name: string } | null;
	bookingType: { _id: string; name: string; color: string } | null;
	startTime: string;
	endTime: string;
	durationMinutes: number;
	priceSnapshot: number;
	status: "booked" | "cancelled";
	createdAt: string;
}

export type CreateBookingPayload = {
	bay: string;
	bookingType: string;
	startTime: string;
	durationMinutes: number;
};
