import { useState } from "react";
import { isAxiosError } from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
	Card,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { useSeo } from "@/lib/use-seo";
import { useAuthStore } from "./auth-store";
import type { User } from "@/types";

interface LoginResponse {
	user: {
		_id: string;
		role: User["role"];
		firstName: string;
		lastName: string;
		email: string;
	};
	accessToken: string;
}

export default function LoginPage() {
	useSeo({
		title: "Sign In | Golf Wala",
		description: "Sign in to your Golf Wala account to book a simulator bay.",
		path: "/login",
		noindex: true,
	});

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const login = useAuthStore((state) => state.login);
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const next = searchParams.get("next") || "/book";

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(null);
		setIsSubmitting(true);

		try {
			const { data } = await api.post<LoginResponse>("/auth/login", {
				email,
				password,
			});
			login(data.accessToken, data.user);
			navigate(next, { replace: true });
		} catch (err) {
			if (isAxiosError(err) && err.response) {
				setError(err.response.data?.message ?? "Invalid email or password.");
			} else {
				setError("Something went wrong. Please try again.");
			}
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div className="flex min-h-[calc(100vh-73px)] flex-col items-center justify-center bg-[#0E241B] px-5 py-16">
			<div className="w-full max-w-sm space-y-6">
				<div className="space-y-3 text-center">
					<img
						src="/assets/logo.jpg"
						alt="Golf Wala"
						className="mx-auto h-20 rounded-sm"
					/>
					<h1 className="font-serif text-3xl font-medium text-[#FBF8F0]">
						Sign In
					</h1>
					<p className="text-sm text-gray-400">
						Sign in to book your next session.
					</p>
				</div>

				<form onSubmit={handleSubmit}>
					<Card>
						<CardContent>
							<div className="flex flex-col gap-5">
								{error && (
									<p role="alert" className="text-sm text-destructive">
										{error}
									</p>
								)}
								<div className="grid gap-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="you@example.com"
										autoFocus
										required
										disabled={isSubmitting}
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								<div className="grid gap-2">
									<div className="flex items-center justify-between">
										<Label htmlFor="password">Password</Label>
										<Link
											to="/forgot-password"
											className="text-xs text-[#C6A24D] underline underline-offset-2"
										>
											Forgot password?
										</Link>
									</div>
									<Input
										id="password"
										type="password"
										required
										disabled={isSubmitting}
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>
							</div>
						</CardContent>
						<CardFooter className="flex-col gap-2">
							<Button
								type="submit"
								className="w-full"
								disabled={isSubmitting}
							>
								{isSubmitting ? "Signing in..." : "Sign In"}
							</Button>
						</CardFooter>
					</Card>
				</form>

				<p className="text-center text-sm text-gray-400">
					Don't have an account?{" "}
					<Link
						to={`/register?next=${encodeURIComponent(next)}`}
						className="text-[#C6A24D] underline underline-offset-2"
					>
						Create one
					</Link>
				</p>
			</div>
		</div>
	);
}
