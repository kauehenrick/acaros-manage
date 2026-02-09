import { useEffect } from "react";
import { useAuthorStore } from "@/stores/AuthorStore";
import { useBookStore } from "@/stores/BookStore";
import { useGenreStore } from "@/stores/GenreStore";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function BooksDataTable() {
	const books = useBookStore((state) => state.books);
	const getBooks = useBookStore((state) => state.getBooks);

	const getAuthors = useAuthorStore((state) => state.getAuthors);
	const getGenres = useGenreStore((state) => state.getGenres);

	useEffect(() => {
		getBooks();
		getAuthors();
		getGenres();
	}, [getBooks, getAuthors, getGenres]);

	const activeBooks = books.filter((book) => book.isActive);

	return (
		<div className="container mt-4">
			<DataTable columns={columns} data={activeBooks} />
		</div>
	);
}
