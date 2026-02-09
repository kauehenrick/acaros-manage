import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Button } from "@/components/ui/button";

export default function PeoplePage() {
	return (
		<div className="flex">
			<Sidebar />

			<div className="flex flex-col w-full items-start">
				<Header pageName="Pessoas" />

				<main className="w-full px-6">
					<div className="mt-4 space-x-2">
						<Button>Adicionar</Button>
						<Button>Exportar</Button>
					</div>
				</main>
			</div>
		</div>
	);
}