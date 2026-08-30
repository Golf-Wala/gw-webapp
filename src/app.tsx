import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import HomePage from "./components/home";
import SimPage from "./components/sim";
import ProtectedRoute from "./components/auth/protected-route";
import useInitialAuth from "./components/auth/use-initial-auth";

const LoginPage = lazy(() => import("./components/auth/login-page"));
const RegisterPage = lazy(() => import("./components/auth/register-page"));
const ForgotPasswordPage = lazy(
	() => import("./components/auth/forgot-password-page")
);
const ResetPasswordPage = lazy(
	() => import("./components/auth/reset-password-page")
);
const BookingPage = lazy(() => import("./components/booking"));

export default function App() {
	const isInitializing = useInitialAuth();

	if (isInitializing) return null;

	return (
		<Suspense fallback={null}>
			<Routes>
				<Route element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path="sim" element={<SimPage />} />
					<Route path="login" element={<LoginPage />} />
					<Route path="register" element={<RegisterPage />} />
					<Route
						path="forgot-password"
						element={<ForgotPasswordPage />}
					/>
					<Route path="reset-password" element={<ResetPasswordPage />} />

					<Route element={<ProtectedRoute />}>
						<Route path="book" element={<BookingPage />} />
					</Route>
				</Route>

				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</Suspense>
	);
}
