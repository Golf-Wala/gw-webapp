import { useState } from "react";
import { isAxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { useSeo } from "@/lib/use-seo";
import { useAuthStore } from "./auth-store";
import type { User } from "@/types";

interface RegisterResponse {
	user: {
		_id: string;
		role: User["role"];
		firstName: string;
		lastName: string;
		email: string;
	};
	accessToken: string;
}

export default function RegisterPage() {
	useSeo({
		title: "Create Account | Golf Wala",
		description: "Create a Golf Wala account to book a simulator bay online.",
		path: "/register",
		noindex: true,
	});

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
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
			const { data } = await api.post<RegisterResponse>("/auth/", {
				firstName,
				lastName,
				email,
				password,
			});
			login(data.accessToken, data.user);
			navigate(next, { replace: true });
		} catch (err) {
			if (isAxiosError(err) && err.response) {
				setError(
					err.response.data?.message ??
						err.response.data?.fields?.password?.[0] ??
						"Something went wrong. Please try again."
				);
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
						Create an Account
					</h1>
					<p className="text-sm text-gray-400">
						Sign up to book bay time online.
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
								<div className="grid grid-cols-2 gap-3">
									<div className="grid gap-2">
										<Label htmlFor="firstName">First Name</Label>
										<Input
											id="firstName"
											autoFocus
											required
											disabled={isSubmitting}
											value={firstName}
											onChange={(e) => setFirstName(e.target.value)}
										/>
									</div>
									<div className="grid gap-2">
										<Label htmlFor="lastName">Last Name</Label>
										<Input
											id="lastName"
											required
											disabled={isSubmitting}
											value={lastName}
											onChange={(e) => setLastName(e.target.value)}
										/>
									</div>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="you@example.com"
										required
										disabled={isSubmitting}
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="password">Password</Label>
									<div className="relative">
										<Input
											id="password"
											type={showPassword ? "text" : "password"}
											required
											minLength={6}
											disabled={isSubmitting}
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											className="pr-10"
										/>
										<button
											type="button"
											onClick={() => setShowPassword((s) => !s)}
											disabled={isSubmitting}
											aria-label={
												showPassword ? "Hide password" : "Show password"
											}
											className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
										>
											{showPassword ? (
												<EyeOff className="size-4" />
											) : (
												<Eye className="size-4" />
											)}
										</button>
									</div>
									<p className="text-xs text-muted-foreground">
										At least 6 characters.
									</p>
								</div>
							</div>
						</CardContent>
						<CardFooter className="flex-col gap-2">
							<Button
								type="submit"
								className="w-full"
								disabled={isSubmitting}
							>
								{isSubmitting ? "Creating account..." : "Create Account"}
							</Button>
						</CardFooter>
					</Card>
				</form>

				<p className="text-center text-sm text-gray-400">
					Already have an account?{" "}
					<Link
						to={`/login?next=${encodeURIComponent(next)}`}
						className="text-[#C6A24D] underline underline-offset-2"
					>
						Sign in
					</Link>
				</p>
			</div>
		</div>
	);
}
