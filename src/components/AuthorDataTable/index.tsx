import { useEffect } from "react";
import { useAuthorStore } from "@/stores/AuthorStore";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function AuthorsDataTable() {
	const getAuthors = useAuthorStore((state) => state.getAuthors);
	const authors = useAuthorStore((state) => state.authors);

	useEffect(() => {
		getAuthors();
	}, [getAuthors]);

	return (
		<div className="container mt-4">
			<DataTable columns={columns} data={authors} />
		</div>
	);
}
