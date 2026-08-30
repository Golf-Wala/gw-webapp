export default function Footer() {
	return (
		<footer className="flex flex-col items-center gap-3 border-t-[0.5px] border-t-[#C6A24D] bg-[#0E241B] p-6 md:flex-row md:justify-between md:px-8 md:py-6">
			<img src="/assets/logo.jpg" alt="Golf Wala" className="h-14 rounded-sm md:h-16" />
			<p className="text-sm font-mono text-thin text-gray-300">
				© 2026 Golf Wala · Webb City, MO
			</p>
		</footer>
	);
}
