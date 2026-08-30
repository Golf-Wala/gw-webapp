import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function SimulatorTeaser() {
	return (
		<section className="mx-auto max-w-295 px-8 py-24">
			<div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
				<div className="overflow-hidden rounded-sm">
					<img
						src="https://images.pexels.com/photos/31212256/pexels-photo-31212256.jpeg"
						alt="Golf simulator bay"
						className="aspect-4/3 w-full object-cover"
					/>
				</div>

				<div>
					<div className="mb-5 font-mono text-[13px] uppercase tracking-[0.14em] text-[#9c8248]">
						Indoor Simulator
					</div>
					<h2 className="font-serif text-[32px] font-semibold leading-tight text-[#0E241B] md:text-[38px]">
						Play a full round without leaving Webb City.
					</h2>
					<p className="mt-4 max-w-[46ch] text-base leading-relaxed text-[#4a5a4f]">
						Book time on our indoor simulator for practice,
						lessons, or a full 18 holes on world-class courses —
						rain or shine, any time of year.
					</p>

					<div className="mt-8 flex flex-wrap gap-3.5">
						<Link
							to="/sim"
							className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#1B4433] px-6 py-3.5 text-sm font-medium text-[#FBF8F0] transition-colors hover:bg-[#0E241B]"
						>
							Learn more
							<ArrowRight className="size-4" />
						</Link>
						<Link
							to="/book"
							className="inline-flex items-center justify-center gap-2.5 rounded-sm border border-[#0E241B]/20 px-6 py-3.5 text-sm font-medium text-[#0E241B] transition-colors hover:border-[#C6A24D] hover:text-[#9c8248]"
						>
							Book the simulator
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
