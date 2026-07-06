import { MapPin } from "lucide-react";

export default function Hero() {
	return (
		<div className="bg-[#0E241B] text-[#FBF8F0] py-10 px-5 md:py-20 md:px-10">
			<div className="max-w-125 space-y-8">
				<p className="font-mono font-thin text-xs text-[#C6A24D] flex items-center gap-2">
					<MapPin className="size-4" />
					Webb City, Missouri
				</p>
				<h2 className="font-serif text-4xl md:text-6xl font-medium text-center md:text-left">
					Welcome to Our Golf Club
				</h2>
				<p className="font-light text-gray-300 text-lg tracking-wide text-center md:text-left">
					Premium new and used golf equipment, plus regripping,
					reshafting, and custom club work — all done in-house.
				</p>

				<div className="flex items-center gap-4">
					<a
						href="tel:4176696399"
						className="bg-[#C6A24D] hover:bg-[#856d34] transition-all px-6 py-3 rounded-xs flex items-center gap-2 font-mono text-sm"
					>
						Call The Shop
					</a>
					<a
						href="https://www.google.com/maps/dir/?api=1&destination=2615+N+Range+Line+Rd,+Webb+City,+MO"
						target="_blank"
						rel="noopener noreferrer"
						className="bg-none border border-[#C6A24D] hover:bg-[#C6A24D] transition-all px-6 py-3 rounded-xs flex items-center gap-2 font-mono text-sm"
					>
						Get Directions
					</a>
				</div>

				<div className="flex items-center md:gap-6 gap-4 mt-16">
					<div className="space-y-1">
						<p className="font-mono uppercase font-thin text-xs text-[#C6A24D]">
							Location
						</p>
						<p>2615 N Range Line Rd, Webb City, MO</p>
					</div>
					<div className="space-y-1">
						<p className="font-mono uppercase font-thin text-xs text-[#C6A24D]">
							Hours
						</p>
						<p>Open 7 days · 9am–8pm</p>
					</div>
				</div>
			</div>
		</div>
	);
}
