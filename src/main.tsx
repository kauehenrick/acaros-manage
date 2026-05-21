import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { useAuthStore } from "@/stores/AuthStore";
import AuthorPage from "./pages/AuthorPage";
import BookPage from "./pages/BookPage";
import GenrePage from "./pages/GenrePage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PeoplePage from "./pages/PeoplePage";
import ProtectedRoute from "./pages/ProtectedRoute";
import SettingsPage from "./pages/SettingsPage";

const router = createBrowserRouter([
	{
		path: "/login",
		Component: LoginPage,
	},
	{
		Component: ProtectedRoute,
		children: [
			{
				path: "/",
				Component: HomePage,
			},
			{
				path: "/books",
				Component: BookPage,
			},
			{
				path: "/authors",
				Component: AuthorPage,
			},
			{
				path: "/genres",
				Component: GenrePage,
			},
			{
				path: "/people",
				Component: PeoplePage,
			},
			{
				path: "/settings",
				Component: SettingsPage,
			},
		],
	},
]);

function App() {
	const { getMe, initialized } = useAuthStore();

	useEffect(() => {
		if (initialized) {
			return;
		}

		getMe();
	}, [initialized, getMe]);

	return (
		<>
			<RouterProvider router={router} />
			<Toaster />
		</>
	);
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
