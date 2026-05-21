import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function HomePage() {
	const todaysDate = new Date()
		.toLocaleDateString("pt-BR", {
			weekday: "long",
			day: "numeric",
			month: "long",
			year: "numeric",
		})
		.replace(
			/^[a-z]|\bde [a-z]/g,
			(match) => match.slice(0, -1) + match.slice(-1).toUpperCase(),
		);

	return (
		<div className="flex">
			<Sidebar />

			<div className="flex w-full flex-col items-start">
				<Header pageName="Tela inicial" />

				<main className="mt-4 w-full px-6">
					<h1>{todaysDate}</h1>
				</main>
			</div>
		</div>
	);
}
