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
			"Steel shaft installation",
			"Graphite shaft installation",
			"Shaft replacement",
			"Shaft shortening",
			"Shaft extensions",
			"Adapter installation and replacement",
			"Tip weight installation",
			"Ferrule replacement",
		],
	},
	{
		title: "Loft & Lie Adjustments",
		items: [
			"Loft adjustments",
			"Lie angle adjustments",
			"Loft and lie evaluation",
			"Full bag loft and lie gapping",
			"Iron loft and lie optimization",
		],
	},
	{
		title: "Club Specifications",
		items: [
			"Club length measurement",
			"Swing weight measurement",
			"Swing weight adjustments",
			"Spec verification",
			"Iron spec checks",
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
			"Paint fill restoration",
			"Custom paint fill colors",
			"Wedge stamping",
			"Wedge paint fill",
			"Rust removal and cleanup",
			"Club restoration",
			"Cosmetic refinishing",
		],
	},
	{
		title: "Club Fitting & Performance",
		items: [
			"Loft gapping analysis",
			"Club spec matching",
			"Equipment recommendations",
			"Shaft recommendations",
			"Grip fitting",
			"Length fitting",
			"Swing weight optimization",
		],
	},
	{
		title: "Troubleshooting & Repair",
		items: [
			"Club performance diagnostics",
			"Loose head repairs",
			"Rattle removal",
			"General club repairs",
			"Custom repair solutions",
		],
	},
];

export default function Services() {
	return (
		<section className="p-5 md:p-10 space-y-4">
			<p className="font-mono uppercase text-[#C6A24D] font-thin text-sm">
				What we do
			</p>

			<h2 className="text-4xl font-semibold font-serif max-w-150">
				Club repair & services — done in the shop, not shipped out.
			</h2>

			<p className="font-light text-lg">
				From a quick regrip to a full custom build, our techs handle it
				on-site so your clubs aren't gone for weeks.
			</p>

			<div className="border-t border-l border-[#C6A24D]">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					{services.map((service, index) => (
						<Card
							key={index}
							number={(index + 1).toString().padStart(2, "0")}
							title={service.title}
							items={service.items}
						/>
					))}
				</div>
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
		<div className="border-r border-b border-[#C6A24D] p-6 aspect-square flex flex-col">
			<p className="text-[#C6A24D] font-mono font-thin text-sm">
				{number}
			</p>

			<h3 className="font-serif font-semibold text-xl mt-4">{title}</h3>

			<ul className="mt-4 list-disc list-inside space-y-1 text-sm font-light flex-1">
				{items.map((item, index) => (
					<li key={index}>{item}</li>
				))}
			</ul>
		</div>
	);
}
