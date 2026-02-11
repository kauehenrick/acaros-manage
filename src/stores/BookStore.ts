import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const data = [
	{
		id: "d8d1fba8-9e65-4ff6-aeab-7e7763eb94cd",
		isActive: true,
		title: "O pequeno príncipe",
		author: "3fcf16f2-9400-47bd-9be6-472756104ae6",
		publisherYear: 1943,
		location: "84-31 S142p",
		isbn: "9780156013987",
		genre: "9323e8f8-8001-42e5-8853-05ba6b0b9667",
	},
];

export const bookFormSchema = z.object({
	id: z.string().optional(),
	isActive: z.boolean().optional(),
	title: z.string().min(2, { message: "O título deve ser informado." }),
	author: z.string().min(2, { message: "O autor deve ser informado." }),
	publisherYear: z.coerce
		.number()
		.int()
		.min(1000, { message: "Ano de publicação inválido." })
		.max(new Date().getFullYear(), {
			message: "O ano de publicação não pode ser no futuro.",
		}),
	location: z.string().optional(),
	isbn: z.string().max(13, { message: "ISBN inválido." }).optional(),
	genre: z.string().min(2, { message: "O gênero deve ser informado." }),
});

export type BookProps = z.infer<typeof bookFormSchema>;

type BookStoreProps = {
	books: BookProps[];
	error: null | string | unknown;
	getBooks: () => void;
	addBook: (book: Omit<BookProps, "id" | "isActive">) => void;
	disableBook: (book: BookProps) => void;
	updateBook: (book: Partial<BookProps> & { id: string }) => void;
};

export const useBookStore = create<BookStoreProps>()(
	persist(
		(set) => ({
			books: [],
			error: null,

			getBooks: async () => {
				try {
					set({ books: data, error: null });
				} catch (err) {
					console.error(err);
					toast.error("Erro inesperado ao buscar livros!");
					set({ error: err });
				}
			},

			addBook: (book) => {
				try {
					set((state) => ({
						books: [
							...state.books,
							{
								...book,
								id: uuidv4(),
								isActive: true,
							},
						],
					}));

					toast.success("Livro cadastrado com sucesso!");
				} catch (err) {
					console.error(err);
					toast.error("Erro ao cadastrar o livro.");
				}
			},

			disableBook: (book) => {
				try {
					set((state) => ({
						books: state.books.map((b) =>
							b.id === book.id ? { ...b, isActive: false } : b,
						),
					}));

					toast.success("Livro desativado com sucesso!");
				} catch (err) {
					console.error(err);
					toast.error("Erro ao desativar o livro.");
				}
			},

			updateBook: (book) => {
				try {
					set((state) => ({
						books: state.books.map((b) =>
							b.id === book.id ? { ...b, ...book } : b,
						),
					}));

					toast.success("Livro atualizado com sucesso!");
				} catch (err) {
					console.error(err);
					toast.error("Erro ao atualizar o livro.");
				}
			},
		}),
		{ name: "book-storage" },
	),
);
