import { useState } from "react";
import { isAxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { cn, formatCurrency } from "@/lib/utils";
import {
	useGetBays,
	useGetBookingTypes,
	useGetAvailability,
	useCreateBooking,
} from "./booking.query";
import { formatTime, maxBookableDate, toDateInputValue } from "./booking.utils";

export default function BookingForm() {
	const { data: bays, isPending: baysPending } = useGetBays();
	const { data: bookingTypes, isPending: typesPending } = useGetBookingTypes();
	const { mutate: createBooking, isPending: isBooking } = useCreateBooking();

	const [bayId, setBayId] = useState("");
	const [bookingTypeId, setBookingTypeId] = useState("");
	const [duration, setDuration] = useState<number | null>(null);
	const [date, setDate] = useState(toDateInputValue(new Date()));
	const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

	// Auto-pick the only option when there's just one, without storing it as
	// separate "auto-selected" state — the user's own pick (once made) always
	// takes precedence since it's stored in bayId/bookingTypeId directly.
	const effectiveBayId =
		bayId || (bays?.length === 1 ? bays[0]._id : "");
	const effectiveBookingTypeId =
		bookingTypeId || (bookingTypes?.length === 1 ? bookingTypes[0]._id : "");

	const selectedType = bookingTypes?.find((t) => t._id === effectiveBookingTypeId);

	const effectiveDuration =
		selectedType && duration && selectedType.durationOptions.includes(duration)
			? duration
			: (selectedType?.durationOptions[0] ?? null);

	const { data: availability, isFetching: availabilityLoading } =
		useGetAvailability({
			bay: effectiveBayId,
			bookingType: effectiveBookingTypeId,
			date,
			durationMinutes: effectiveDuration ?? 0,
		});

	// A slot from a previous bay/type/date/duration combo won't be in the
	// freshly fetched list, so it naturally falls away without an effect.
	const effectiveSelectedSlot =
		selectedSlot && availability?.slots.includes(selectedSlot)
			? selectedSlot
			: null;

	function handleConfirm() {
		if (
			!effectiveBayId ||
			!effectiveBookingTypeId ||
			!effectiveDuration ||
			!effectiveSelectedSlot
		) {
			return;
		}

		createBooking(
			{
				bay: effectiveBayId,
				bookingType: effectiveBookingTypeId,
				startTime: effectiveSelectedSlot,
				durationMinutes: effectiveDuration,
			},
			{
				onSuccess: () => {
					toast.add({
						title: "Booking confirmed!",
						description: "We'll see you then.",
					});
					setSelectedSlot(null);
				},
				onError: (error) => {
					toast.add({
						type: "error",
						title: "Couldn't complete booking",
						description: isAxiosError(error)
							? (error.response?.data?.message ??
								"An unknown error occurred.")
							: "An unknown error occurred.",
					});
				},
			}
		);
	}

	const ready = effectiveBayId && effectiveBookingTypeId && effectiveDuration && date;

	return (
		<div className="space-y-6 rounded-lg border border-[#C6A24D]/30 bg-[#FBF8F0] p-5 md:p-8">
			<div>
				<p className="font-mono text-xs uppercase tracking-[0.14em] text-[#9c8248]">
					Reserve Your Bay
				</p>
				<h2 className="mt-1 font-serif text-2xl font-semibold text-[#0E241B]">
					Book a Session
				</h2>
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div className="space-y-1.5">
					<Label htmlFor="bay">Bay</Label>
					<Select
						items={Object.fromEntries(
							(bays ?? []).map((bay) => [bay._id, bay.name])
						)}
						value={effectiveBayId}
						onValueChange={(v) => v && setBayId(v)}
						disabled={baysPending}
					>
						<SelectTrigger id="bay" className="w-full">
							<SelectValue placeholder="Select a bay" />
						</SelectTrigger>
						<SelectContent>
							{(bays ?? []).map((bay) => (
								<SelectItem key={bay._id} value={bay._id}>
									{bay.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-1.5">
					<Label htmlFor="bookingType">Session Type</Label>
					<Select
						items={Object.fromEntries(
							(bookingTypes ?? []).map((type) => [type._id, type.name])
						)}
						value={effectiveBookingTypeId}
						onValueChange={(v) => v && setBookingTypeId(v)}
						disabled={typesPending}
					>
						<SelectTrigger id="bookingType" className="w-full">
							<SelectValue placeholder="Select a type" />
						</SelectTrigger>
						<SelectContent>
							{(bookingTypes ?? []).map((type) => (
								<SelectItem key={type._id} value={type._id}>
									{type.name} — {formatCurrency(type.hourlyPrice)}/hr
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-1.5">
					<Label htmlFor="date">Date</Label>
					<Input
						id="date"
						type="date"
						value={date}
						min={toDateInputValue(new Date())}
						max={maxBookableDate()}
						onChange={(e) => setDate(e.target.value)}
					/>
				</div>

				<div className="space-y-1.5">
					<Label>Duration</Label>
					<div className="flex flex-wrap gap-2">
						{(selectedType?.durationOptions ?? []).map((option) => (
							<button
								key={option}
								type="button"
								onClick={() => setDuration(option)}
								className={cn(
									"rounded-md border px-3 py-2 text-sm transition-colors",
									effectiveDuration === option
										? "border-[#C6A24D] bg-[#C6A24D] text-[#0E241B]"
										: "border-[#C6A24D]/40 bg-transparent text-[#0E241B] hover:border-[#C6A24D]"
								)}
							>
								{option} min
							</button>
						))}
						{!selectedType && (
							<p className="text-sm text-muted-foreground">
								Select a session type first.
							</p>
						)}
					</div>
				</div>
			</div>

			<div className="space-y-2">
				<Label>Available Times</Label>
				{!ready && (
					<p className="text-sm text-muted-foreground">
						Choose a bay, session type, and date to see available times.
					</p>
				)}
				{ready && availabilityLoading && (
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<Spinner className="size-4" />
						Loading available times...
					</div>
				)}
				{ready && !availabilityLoading && availability?.isClosed && (
					<p className="text-sm text-muted-foreground">
						We're closed on this day. Please pick another date.
					</p>
				)}
				{ready &&
					!availabilityLoading &&
					!availability?.isClosed &&
					availability?.slots.length === 0 && (
						<p className="text-sm text-muted-foreground">
							No times available for this day — try another date.
						</p>
					)}
				{ready && !availabilityLoading && (availability?.slots.length ?? 0) > 0 && (
					<div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
						{availability!.slots.map((slot) => (
							<button
								key={slot}
								type="button"
								onClick={() => setSelectedSlot(slot)}
								className={cn(
									"rounded-md border px-2 py-2 text-sm transition-colors",
									effectiveSelectedSlot === slot
										? "border-[#C6A24D] bg-[#C6A24D] text-[#0E241B]"
										: "border-[#C6A24D]/40 bg-transparent text-[#0E241B] hover:border-[#C6A24D]"
								)}
							>
								{formatTime(slot)}
							</button>
						))}
					</div>
				)}
			</div>

			<Button
				className="w-full sm:w-auto"
				disabled={!effectiveSelectedSlot || isBooking}
				onClick={handleConfirm}
			>
				{isBooking ? "Booking..." : "Confirm Booking"}
			</Button>
		</div>
	);
}
