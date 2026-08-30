import { useState } from "react";
import { isAxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { useSeo } from "@/lib/use-seo";

export default function ResetPasswordPage() {
	useSeo({
		title: "Reset Password | Golf Wala",
		description: "Set a new password for your Golf Wala account.",
		path: "/reset-password",
		noindex: true,
	});

	const [searchParams] = useSearchParams();
	const token = searchParams.get("token");

	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(null);

		if (password !== confirmPassword) {
			setError("Passwords don't match.");
			return;
		}

		setIsSubmitting(true);
		try {
			await api.post("/auth/reset-password", { token, password });
			setSubmitted(true);
		} catch (err) {
			if (isAxiosError(err) && err.response) {
				setError(
					err.response.data?.message ?? "Something went wrong. Please try again."
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
						Set a New Password
					</h1>
				</div>

				{!token ? (
					<Card>
						<CardContent>
							<p className="text-sm text-destructive">
								This reset link is missing its token. Request a new one
								below.
							</p>
						</CardContent>
						<CardFooter>
							<Button
								className="w-full"
								render={<Link to="/forgot-password" />}
							>
								Request New Link
							</Button>
						</CardFooter>
					</Card>
				) : submitted ? (
					<Card>
						<CardContent>
							<p className="text-sm text-foreground">
								Your password has been updated.
							</p>
						</CardContent>
						<CardFooter>
							<Button className="w-full" render={<Link to="/login" />}>
								Go to Sign In
							</Button>
						</CardFooter>
					</Card>
				) : (
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
										<Label htmlFor="password">New Password</Label>
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
													showPassword
														? "Hide password"
														: "Show password"
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
									<div className="grid gap-2">
										<Label htmlFor="confirmPassword">
											Confirm New Password
										</Label>
										<Input
											id="confirmPassword"
											type={showPassword ? "text" : "password"}
											required
											minLength={6}
											disabled={isSubmitting}
											value={confirmPassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
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
									{isSubmitting ? "Updating..." : "Update Password"}
								</Button>
							</CardFooter>
						</Card>
					</form>
				)}

				<p className="text-center text-sm text-gray-400">
					Remembered your password?{" "}
					<Link
						to="/login"
						className="text-[#C6A24D] underline underline-offset-2"
					>
						Sign in
					</Link>
				</p>
			</div>
		</div>
	);
}
