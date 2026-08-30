import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/toast";
import { formatCurrency } from "@/lib/utils";
import type { Booking } from "@/types";
import { useCancelBooking, useGetMyBookings } from "./booking.query";
import { formatDateTime } from "./booking.utils";

// Bookings list is short-lived per page view, so refreshing "now" every 30s
// is plenty to keep the completed/upcoming split accurate without a
// per-second re-render. Seeded via effect (not at render) to stay pure.
function useNow(intervalMs = 30_000) {
	const [now, setNow] = useState<number | null>(null);

	useEffect(() => {
		const tick = () => setNow(Date.now());
		tick();
		const id = setInterval(tick, intervalMs);
		return () => clearInterval(id);
	}, [intervalMs]);

	return now;
}

export default function MyBookings() {
	const { data: bookings, isPending } = useGetMyBookings();
	const { mutate: cancelBooking, isPending: isCancelling } = useCancelBooking();
	const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);
	const now = useNow();

	function handleConfirmCancel() {
		if (!bookingToCancel) return;

		cancelBooking(bookingToCancel._id, {
			onSuccess: () => {
				toast.add({ title: "Booking cancelled" });
				setBookingToCancel(null);
			},
			onError: (error) => {
				toast.add({
					type: "error",
					title: "Couldn't cancel booking",
					description: isAxiosError(error)
						? (error.response?.data?.message ?? "An unknown error occurred.")
						: "An unknown error occurred.",
				});
			},
		});
	}

	return (
		<div className="space-y-4 rounded-lg border border-[#C6A24D]/30 bg-[#FBF8F0] p-5 md:p-8">
			<div>
				<p className="font-mono text-xs uppercase tracking-[0.14em] text-[#9c8248]">
					Your Sessions
				</p>
				<h2 className="mt-1 font-serif text-2xl font-semibold text-[#0E241B]">
					My Bookings
				</h2>
			</div>

			{isPending && (
				<div className="flex items-center gap-2 text-sm text-muted-foreground">
					<Spinner className="size-4" />
					Loading your bookings...
				</div>
			)}

			{!isPending && (bookings ?? []).length === 0 && (
				<p className="text-sm text-muted-foreground">
					You don't have any bookings yet.
				</p>
			)}

			<div className="space-y-3">
				{(bookings ?? []).map((booking) => {
					const isPast =
						now !== null && new Date(booking.startTime).getTime() <= now;
					const canCancel = booking.status === "booked" && !isPast;

					return (
						<div
							key={booking._id}
							className="flex flex-col gap-2 rounded-md border border-[#C6A24D]/25 bg-white/60 p-4 sm:flex-row sm:items-center sm:justify-between"
						>
							<div className="space-y-1">
								<div className="flex flex-wrap items-center gap-2">
									{booking.bookingType && (
										<span
											className="size-2 shrink-0 rounded-full"
											style={{ backgroundColor: booking.bookingType.color }}
										/>
									)}
									<p className="font-medium text-[#0E241B]">
										{booking.bookingType?.name ?? "Deleted session type"} ·{" "}
										{booking.bay?.name ?? "Deleted bay"}
									</p>
									<Badge
										variant={
											booking.status === "booked"
												? "default"
												: "secondary"
										}
										className="capitalize"
									>
										{isPast && booking.status === "booked"
											? "completed"
											: booking.status}
									</Badge>
								</div>
								<p className="text-sm text-muted-foreground">
									{formatDateTime(booking.startTime)} ·{" "}
									{booking.durationMinutes} min ·{" "}
									{formatCurrency(booking.priceSnapshot)}
								</p>
							</div>

							{canCancel && (
								<Button
									variant="outline"
									size="sm"
									className="self-start sm:self-center"
									onClick={() => setBookingToCancel(booking)}
								>
									Cancel
								</Button>
							)}
						</div>
					);
				})}
			</div>

			<AlertDialog
				open={!!bookingToCancel}
				onOpenChange={(open) => !open && setBookingToCancel(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Cancel this booking?</AlertDialogTitle>
						<AlertDialogDescription>
							{bookingToCancel && (
								<>
									This will cancel your{" "}
									{bookingToCancel.bookingType?.name ?? ""} session on{" "}
									{formatDateTime(bookingToCancel.startTime)}. This action
									cannot be undone.
								</>
							)}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={isCancelling}>
							Keep Booking
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleConfirmCancel}
							disabled={isCancelling}
						>
							{isCancelling ? "Cancelling..." : "Cancel Booking"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
