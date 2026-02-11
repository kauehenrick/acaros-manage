import { useAuthorStore } from "@/stores/AuthorStore";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function AuthorsDataTable() {
	const authors = useAuthorStore((state) => state.authors);
	const activeAuthors = authors.filter((author) => author.isActive);

	return (
		<div className="container mt-4">
			<DataTable columns={columns} data={activeAuthors} />
		</div>
	);
}
