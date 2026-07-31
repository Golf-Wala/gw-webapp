import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import HomePage from "./components/home";
import SimPage from "./components/sim";

export default function App() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route index element={<HomePage />} />
				<Route path="sim" element={<SimPage />} />
			</Route>

			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
}
