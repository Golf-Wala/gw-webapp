import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
	return (
		<header className="relative overflow-hidden">
			<div className="absolute inset-0">
				<img
					src="https://images.pexels.com/photos/5928401/pexels-photo-5928401.jpeg"
					alt=""
					className="h-full w-full scale-105 object-cover"
				/>
				<div className="absolute inset-0 bg-[#1B4433]/70" />
				<div className="absolute inset-0 bg-linear-to-t from-[#0E241B] via-transparent to-transparent" />
			</div>

			<div className="relative mx-auto max-w-295 px-8 py-28 md:py-36">
				<div className="mb-5 flex items-center gap-2.5 font-mono text-[13px] uppercase tracking-[0.14em] text-[#C6A24D]">
					<MapPin className="size-4" />
					Webb City, Missouri
				</div>
				<h1 className="max-w-2xl font-serif text-[40px] font-semibold leading-[1.05] text-[#FBF8F0] md:text-[56px]">
					Your clubs,{" "}
					<em className="font-medium not-italic text-[#C6A24D]">
						built and repaired in-house.
					</em>
				</h1>
				<p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-[#FBF8F0]/75">
					Premium new and used golf equipment, plus regripping,
					reshafting, and custom club work — all done on-site by our
					techs.
				</p>

				<div className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap">
					<Link
						to="/book"
						className="inline-flex items-center justify-center gap-2.5 rounded-sm bg-[#C6A24D] px-6 py-3.5 text-sm font-medium text-[#0E241B] transition-colors hover:bg-[#d8b562]"
					>
						Book a Bay
					</Link>
					<a
						href="tel:4176696399"
						className="inline-flex items-center justify-center gap-2.5 rounded-sm border border-[#FBF8F0]/30 px-6 py-3.5 text-sm font-medium text-[#FBF8F0] transition-colors hover:border-[#C6A24D] hover:text-[#C6A24D]"
					>
						Call the shop
					</a>
					<a
						href="https://www.google.com/maps/dir/?api=1&destination=2615+N+Range+Line+Rd,+Webb+City,+MO"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center justify-center gap-2.5 rounded-sm border border-[#FBF8F0]/30 px-6 py-3.5 text-sm font-medium text-[#FBF8F0] transition-colors hover:border-[#C6A24D] hover:text-[#C6A24D]"
					>
						Get directions
					</a>
				</div>

				<div className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4">
					<div>
						<p className="font-mono text-xs uppercase tracking-[0.12em] text-[#C6A24D]">
							Location
						</p>
						<p className="mt-1 text-sm text-[#FBF8F0]/75">
							2615 N Range Line Rd, Webb City, MO
						</p>
					</div>
					<div>
						<p className="font-mono text-xs uppercase tracking-[0.12em] text-[#C6A24D]">
							Hours
						</p>
						<p className="mt-1 text-sm text-[#FBF8F0]/75">
							Open 7 days · 9am–8pm
						</p>
					</div>
				</div>
			</div>
		</header>
	);
}
