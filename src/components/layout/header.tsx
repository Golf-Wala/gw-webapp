import { CalendarDays, LogOut, Menu, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/lib/api";
import { useAuthStore } from "../auth/auth-store";

export default function Header() {
	const user = useAuthStore((s) => s.user);
	const logout = useAuthStore((s) => s.logout);
	const navigate = useNavigate();

	async function handleLogout() {
		try {
			await api.post("/auth/logout");
		} catch {
			// ignore — clear local state regardless
		} finally {
			logout();
			navigate("/");
		}
	}

	return (
		<header className="flex items-center justify-between gap-2 border-b-[0.5px] border-b-[#C6A24D] bg-[#0E241B] p-4 text-[#FBF8F0] md:px-10 md:py-5">
			<Link to="/" className="flex shrink-0 items-center gap-2">
				<img
					src="/assets/icon.jpg"
					alt=""
					className="h-8 w-8 rounded-sm"
				/>
				<span className="text-base uppercase sm:text-lg">
					Golf Wala
				</span>
			</Link>

			<nav className="flex items-center gap-2 sm:gap-4">
				<Link
					to="/book"
					className="flex items-center gap-2 rounded-xs bg-[#C6A24D] px-4 py-2.5 font-mono text-xs transition-all hover:bg-[#856d34] sm:px-6 sm:py-3"
				>
					<CalendarDays className="size-4" />
					Book Now
				</Link>

				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<Button
								variant="ghost"
								size="icon"
								className="text-[#FBF8F0] hover:bg-white/10 hover:text-[#C6A24D]"
							>
								<Menu />
							</Button>
						}
					/>
					<DropdownMenuContent align="end" className="min-w-48">
						<DropdownMenuItem render={<Link to="/" />}>
							Home
						</DropdownMenuItem>
						<DropdownMenuItem render={<Link to="/sim" />}>
							Simulator
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						{user ? (
							<DropdownMenuItem onClick={handleLogout}>
								<LogOut />
								Log Out
							</DropdownMenuItem>
						) : (
							<DropdownMenuItem render={<Link to="/login" />}>
								<User />
								Sign In
							</DropdownMenuItem>
						)}
					</DropdownMenuContent>
				</DropdownMenu>
			</nav>
		</header>
	);
}
