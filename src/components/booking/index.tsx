import { useSeo } from "@/lib/use-seo";
import BookingForm from "./booking-form";
import MyBookings from "./my-bookings";

export default function BookingPage() {
	useSeo({
		title: "Book a Bay | Golf Wala",
		description: "Book a simulator bay session at Golf Wala in Webb City, MO.",
		path: "/book",
		noindex: true,
	});

	return (
		<div className="bg-[#F3EEE0] text-[#152018]">
			<header className="bg-[#0E241B] px-5 py-14 text-center md:px-10 md:py-20">
				<p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-[#C6A24D]">
					Indoor Golf Simulator
				</p>
				<h1 className="font-serif text-3xl font-semibold text-[#FBF8F0] md:text-5xl">
					Book Your Bay
				</h1>
				<p className="mx-auto mt-4 max-w-md text-[#FBF8F0]/75">
					Pick a bay, a session type, and a time that works for you.
				</p>
			</header>

			<div className="mx-auto grid max-w-295 grid-cols-1 gap-6 px-5 py-10 md:px-10 md:py-14 lg:grid-cols-[1.3fr_1fr]">
				<div className="order-2 lg:order-1">
					<BookingForm />
				</div>
				<div className="order-1 lg:order-2">
					<MyBookings />
				</div>
			</div>
		</div>
	);
}
