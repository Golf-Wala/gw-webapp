import { Star } from "lucide-react";

const testimonials = [
	{
		quote: "Regripped my whole bag in a day and the sizing was spot on. Feels like new clubs.",
		name: "Mike D.",
	},
	{
		quote: "Best fitting I've had — they caught a lie angle issue no one else even checked for.",
		name: "Sarah T.",
	},
	{
		quote: "The simulator bays are great for winter practice. Booking online is quick and easy.",
		name: "Jason R.",
	},
];

export default function Testimonials() {
	return (
		<section className="border-y border-[#C6A24D]/30 bg-[#F3EEE0]">
			<div className="mx-auto max-w-295 px-8 py-24">
				<div className="mb-14 max-w-xl">
					<div className="mb-5 font-mono text-[13px] uppercase tracking-[0.14em] text-[#9c8248]">
						What golfers say
					</div>
					<h2 className="font-serif text-[32px] font-semibold leading-tight text-[#0E241B] md:text-[38px]">
						Trusted by golfers around Webb City.
					</h2>
				</div>

				<div className="grid grid-cols-1 gap-px border border-[#C6A24D]/35 bg-[#C6A24D]/35 md:grid-cols-3">
					{testimonials.map((t) => (
						<div
							key={t.name}
							className="flex flex-col gap-4 bg-[#FBF8F0] p-8"
						>
							<div className="flex gap-1 text-[#C6A24D]">
								{Array.from({ length: 5 }).map((_, i) => (
									<Star
										key={i}
										className="size-4 fill-current"
									/>
								))}
							</div>
							<p className="text-sm leading-relaxed text-[#586b5d]">
								“{t.quote}”
							</p>
							<p className="mt-auto font-mono text-xs uppercase tracking-[0.1em] text-[#0E241B]">
								{t.name}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
