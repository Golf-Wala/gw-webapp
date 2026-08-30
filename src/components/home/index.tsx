import { useSeo } from "@/lib/use-seo";
import Hero from "./hero";
import LocationCta from "./location-cta";
import Services from "./services";
import SimulatorTeaser from "./simulator-teaser";
import Testimonials from "./testimonials";

export default function HomePage() {
	useSeo({
		title: "Golf Wala | Premium Golf Equipment & Club Services in Webb City, MO",
		description:
			"New and used golf clubs, regripping, reshafting, loft & lie adjustments, and custom club builds in Webb City, MO. Open 7 days, 9am–8pm. Trade-ins welcome — cash paid for clubs.",
		path: "/",
	});

	return (
		<>
			<Hero />
			<Services />
			<SimulatorTeaser />
			<Testimonials />
			<LocationCta />
		</>
	);
}
