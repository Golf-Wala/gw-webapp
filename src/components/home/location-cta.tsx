import { Clock, MapPin, Phone } from "lucide-react";

export default function LocationCta() {
	return (
		<section className="bg-[#1B4433]">
			<div className="mx-auto flex max-w-295 flex-wrap items-center justify-between gap-10 px-8 py-14">
				<div className="flex flex-wrap gap-x-12 gap-y-6">
					<div>
						<div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-[#C6A24D]">
							<MapPin className="size-4" />
							Location
						</div>
						<p className="mt-2 text-sm text-[#FBF8F0]/75">
							2615 N Range Line Rd
							<br />
							Webb City, MO
						</p>
					</div>
					<div>
						<div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-[#C6A24D]">
							<Clock className="size-4" />
							Hours
						</div>
						<p className="mt-2 text-sm text-[#FBF8F0]/75">
							Open 7 days
							<br />
							9am–8pm
						</p>
					</div>
					<div>
						<div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-[#C6A24D]">
							<Phone className="size-4" />
							Phone
						</div>
						<p className="mt-2 text-sm text-[#FBF8F0]/75">
							<a
								href="tel:4176696399"
								className="hover:text-[#C6A24D]"
							>
								(417) 669-6399
							</a>
						</p>
					</div>
				</div>

				<a
					href="https://www.google.com/maps/dir/?api=1&destination=2615+N+Range+Line+Rd,+Webb+City,+MO"
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center justify-center gap-2.5 rounded-sm bg-[#C6A24D] px-6 py-3.5 text-sm font-medium text-[#0E241B] transition-colors hover:bg-[#d8b562]"
				>
					Get directions
				</a>
			</div>
		</section>
	);
}
