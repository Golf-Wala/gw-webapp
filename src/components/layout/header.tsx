import { Phone } from "lucide-react";

export default function Header() {
	return (
		<header className="bg-[#0E241B] text-[#FBF8F0] p-4 md:px-10 py-5 flex justify-between items-center border-b-[#C6A24D] border-b-[0.5px]">
			<h1 className="uppercase text-lg">Golf Wala</h1>
			<nav className="flex gap-8 items-center">
				<a
					href="tel:4176696399"
					className=" bg-[#BE5A34] hover:bg-[#8a4428] transition-all px-6 py-3 rounded-xs flex items-center gap-2 font-mono font-thin text-xs"
				>
					<Phone className="size-4" />
					417-669-6399
				</a>
			</nav>
		</header>
	);
}
