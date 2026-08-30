const services = [
	{
		title: "Regripping",
		items: [
			"Single club regripping",
			"Full iron set regripping",
			"Full bag regripping",
			"Grip removal and grip saving",
			"Grip sizing recommendations",
		],
	},
	{
		title: "Shaft Work",
		items: [
			"Driver reshafting",
			"Fairway wood reshafting",
			"Hybrid reshafting",
			"Iron reshafting",
			"Steel and graphite shaft installation",
			"Shaft shortening and extensions",
			"Adapter and tip weight installation",
			"Ferrule replacement",
		],
	},
	{
		title: "Loft & Lie Adjustments",
		items: [
			"Loft and lie adjustments",
			"Loft and lie evaluation",
			"Full bag loft and lie gapping",
			"Iron loft and lie optimization",
		],
	},
	{
		title: "Club Specifications",
		items: [
			"Club length measurement",
			"Swing weight measurement and adjustments",
			"Spec and iron spec verification",
			"Full club inspection",
		],
	},
	{
		title: "Putter Services",
		items: [
			"Putter regripping",
			"Putter length adjustments",
			"Putter loft adjustments",
			"Putter lie adjustments",
		],
	},
	{
		title: "Club Customization",
		items: [
			"Custom ferrule installation",
			"Paint fill restoration and custom colors",
			"Wedge stamping and paint fill",
			"Rust removal and club restoration",
			"Cosmetic refinishing",
		],
	},
	{
		title: "Club Fitting & Performance",
		items: [
			"Loft gapping analysis",
			"Club spec and shaft matching",
			"Grip and length fitting",
			"Swing weight optimization",
		],
	},
	{
		title: "Troubleshooting & Repair",
		items: [
			"Club performance diagnostics",
			"Loose head repairs",
			"Rattle removal",
			"General and custom repairs",
		],
	},
];

export default function Services() {
	return (
		<section className="mx-auto max-w-295 px-8 py-24">
			<div className="mb-14 max-w-xl">
				<div className="mb-5 font-mono text-[13px] uppercase tracking-[0.14em] text-[#9c8248]">
					What we do
				</div>
				<h2 className="font-serif text-[32px] font-semibold leading-tight text-[#0E241B] md:text-[38px]">
					Club repair &amp; services, done in the shop.
				</h2>
				<p className="mt-4 text-base leading-relaxed text-[#4a5a4f]">
					From a quick regrip to a full custom build, our techs
					handle it on-site so your clubs aren't gone for weeks.
				</p>
			</div>

			<div className="grid grid-cols-1 gap-px border border-[#C6A24D]/35 bg-[#C6A24D]/35 md:grid-cols-2 lg:grid-cols-4">
				{services.map((service, index) => (
					<Card
						key={service.title}
						number={(index + 1).toString().padStart(2, "0")}
						title={service.title}
						items={service.items}
					/>
				))}
			</div>
		</section>
	);
}

function Card({
	number,
	title,
	items,
}: {
	number: string;
	title: string;
	items: string[];
}) {
	return (
		<div className="flex flex-col bg-[#FBF8F0] p-8">
			<p className="font-mono text-xs text-[#C6A24D]">{number}</p>

			<h3 className="mt-4 font-serif text-lg font-semibold text-[#0E241B]">
				{title}
			</h3>

			<ul className="mt-4 flex-1 space-y-2 text-sm leading-relaxed text-[#586b5d]">
				{items.map((item) => (
					<li key={item} className="flex gap-2">
						<span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#C6A24D]/60" />
						{item}
					</li>
				))}
			</ul>
		</div>
	);
}
