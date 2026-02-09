import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Toaster } from "sonner";
import AuthorPage from "./pages/AuthorPage";
import BookPage from "./pages/BookPage";
import GenrePage from "./pages/GenrePage";
import HomePage from "./pages/HomePage";
import PeoplePage from "./pages/PeoplePage";
import SettingsPage from "./pages/SettingsPage";

const router = createBrowserRouter([
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
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
		<Toaster />
	</StrictMode>,
);
