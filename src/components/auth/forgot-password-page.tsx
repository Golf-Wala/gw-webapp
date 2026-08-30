import { useState } from "react";
import { isAxiosError } from "axios";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { useSeo } from "@/lib/use-seo";

export default function ForgotPasswordPage() {
	useSeo({
		title: "Forgot Password | Golf Wala",
		description: "Reset the password for your Golf Wala account.",
		path: "/forgot-password",
		noindex: true,
	});

	const [email, setEmail] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(null);
		setIsSubmitting(true);

		try {
			await api.post("/auth/forgot-password", { email });
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
						Reset Password
					</h1>
					<p className="text-sm text-gray-400">
						Enter your email and we'll send you a reset link.
					</p>
				</div>

				{submitted ? (
					<Card>
						<CardContent>
							<p className="text-sm text-foreground">
								If an account exists for <strong>{email}</strong>, we've
								sent a password reset link. Check your inbox (and spam
								folder).
							</p>
						</CardContent>
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
								</div>
							</CardContent>
							<CardFooter className="flex-col gap-2">
								<Button
									type="submit"
									className="w-full"
									disabled={isSubmitting}
								>
									{isSubmitting ? "Sending..." : "Send Reset Link"}
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
