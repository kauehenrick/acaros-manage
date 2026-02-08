import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function HomePage() {
	return (
		<div className="flex">
			<Sidebar />

			<main className="flex flex-col w-full items-start">
				<Header pageName="Tela inicial" />
			</main>
		</div>
	);
}
