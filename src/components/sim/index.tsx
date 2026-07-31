const CALENDLY_URL = "https://calendly.com/golfwala/simulator"; // TODO: swap for real Calendly link

const FEATURES = [
	{
		title: "Play Year-Round",
		desc: "Weather doesn't matter. Dial in your swing or play a full round in climate-controlled comfort.",
	},
	{
		title: "Real Course Data",
		desc: "High-speed sensors track ball flight, spin, and clubhead speed for accurate, realistic shots.",
	},
	{
		title: "Dozens of Courses",
		desc: "From local favorites to famous championship courses, all loaded and ready to play.",
	},
	{
		title: "Built-In Swing Analysis",
		desc: "Every shot logs your data, so you can actually see what's changing between sessions.",
	},
	{
		title: "Great for Groups",
		desc: "Bring friends, family, or coworkers — the bay comfortably fits a small group for a round or a lesson.",
	},
	{
		title: "All Skill Levels",
		desc: "Practice mode for beginners, full 18-hole rounds for the low-handicappers.",
	},
];

export default function SimPage() {
	return (
		<div className="bg-[#F3EEE0] text-[#152018]">
			{/* HERO */}
			<header className="relative overflow-hidden">
				<div className="absolute inset-0">
					<img
						src="https://images.pexels.com/photos/31212256/pexels-photo-31212256.jpeg"
						alt="Golf simulator bay"
						className="h-full w-full object-cover"
					/>
					{/* green overlay, same primary green as the rest of the site */}
					<div className="absolute inset-0 bg-[#1B4433]/80" />
					<div className="absolute inset-0 bg-linear-to-t from-[#0E241B] via-transparent to-transparent" />
				</div>

				<div className="relative mx-auto max-w-295 px-8 py-28 md:py-36">
					<div className="mb-5 flex items-center gap-2.5 font-mono text-[13px] uppercase tracking-[0.14em] text-[#C6A24D]">
						<span className="h-px w-5 bg-[#C6A24D]" />
						Indoor Golf Simulator
					</div>
					<h1 className="max-w-2xl font-serif text-[40px] font-semibold leading-[1.05] text-[#FBF8F0] md:text-[56px]">
						Play a full round{" "}
						<em className="font-medium not-italic text-[#C6A24D]">
							without leaving Webb City.
						</em>
					</h1>
					<p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-[#FBF8F0]/75">
						Book time on our indoor simulator for practice, lessons,
						or a full 18 holes on world-class courses — rain or
						shine, any time of year.
					</p>

					<div className="mt-9 flex flex-wrap gap-3.5">
						<a
							href={CALENDLY_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2.5 rounded-sm bg-[#C6A24D] px-6 py-3.5 text-sm font-medium text-[#0E241B] transition-colors hover:bg-[#d8b562]"
						>
							Book the Simulator
						</a>
						<a
							href="tel:4176696399"
							className="inline-flex items-center gap-2.5 rounded-sm border border-[#FBF8F0]/30 px-6 py-3.5 text-sm font-medium text-[#FBF8F0] transition-colors hover:border-[#C6A24D] hover:text-[#C6A24D]"
						>
							Call the shop
						</a>
					</div>
				</div>
			</header>

			{/* FEATURES */}
			<section className="mx-auto max-w-295 px-8 py-24">
				<div className="mb-14 max-w-xl">
					<div className="mb-5 font-mono text-[13px] uppercase tracking-[0.14em] text-[#9c8248]">
						Why practice indoors
					</div>
					<h2 className="font-serif text-[32px] font-semibold leading-tight text-[#0E241B] md:text-[38px]">
						Same feel, none of the weather.
					</h2>
					<p className="mt-4 text-base leading-relaxed text-[#4a5a4f]">
						Our simulator setup gives you real ball data and real
						courses, so the hours you put in actually carry over to
						the course.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-px border border-[#C6A24D]/35 bg-[#C6A24D]/35 md:grid-cols-3">
					{FEATURES.map((f) => (
						<div key={f.title} className="bg-[#FBF8F0] p-8">
							<h3 className="font-serif text-lg font-semibold text-[#0E241B]">
								{f.title}
							</h3>
							<p className="mt-2 text-sm leading-relaxed text-[#586b5d]">
								{f.desc}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* BOOKING CTA */}
			<section className="border-y border-[#C6A24D]/30 bg-[#1B4433]">
				<div className="mx-auto flex max-w-295 flex-wrap items-center justify-between gap-6 px-8 py-14">
					<div>
						<div className="font-mono text-xs uppercase tracking-[0.12em] text-[#C6A24D]">
							Ready to play?
						</div>
						<div className="mt-1.5 font-serif text-2xl font-semibold text-[#FBF8F0]">
							Book your bay time in under a minute.
						</div>
					</div>

					<a
						href={CALENDLY_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2.5 rounded-sm bg-[#C6A24D] px-6 py-3.5 text-sm font-medium text-[#0E241B] transition-colors hover:bg-[#d8b562]"
					>
						Book the Simulator
					</a>
				</div>
			</section>
		</div>
	);
}
