import { useAuthStore } from "./auth-store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
	const { user, hasHydrated } = useAuthStore();
	const location = useLocation();

	if (!hasHydrated) return null;

	if (!user) {
		const next = encodeURIComponent(location.pathname + location.search);
		return <Navigate to={`/login?next=${next}`} replace />;
	}

	return <Outlet />;
}
