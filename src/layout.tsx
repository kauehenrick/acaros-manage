import { useEffect } from "react";
import { useAuthorStore } from "./stores/AuthorStore";
import { useBookStore } from "./stores/BookStore";
import { useGenreStore } from "./stores/GenreStore";

export default function StoresLayout() {
	const getBooks = useBookStore((state) => state.getBooks);
	const getAuthors = useAuthorStore((state) => state.getAuthors);
	const getGenres = useGenreStore((state) => state.getGenres);

	useEffect(() => {
		getBooks();
		getAuthors();
		getGenres();
	}, [getBooks, getAuthors, getGenres]);

	return null;
}
