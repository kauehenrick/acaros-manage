import { useBookStore } from "@/stores/BookStore";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function BooksDataTable() {
	const books = useBookStore((state) => state.books);
	const activeBooks = books.filter((book) => book.isActive);

	return (
		<div className="container mt-4">
			<DataTable columns={columns} data={activeBooks} />
		</div>
	);
}
