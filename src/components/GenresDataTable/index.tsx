import { useGenreStore } from "@/stores/GenreStore";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function GenresDataTable() {
	const genres = useGenreStore((state) => state.genres);
	const activeGenres = genres.filter((genre) => genre.isActive);

	return (
		<div className="container mt-4">
			<DataTable columns={columns} data={activeGenres} />
		</div>
	);
}
