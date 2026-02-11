import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const authorsData: AuthorProps[] = [
	{
		id: "08d89652-9fae-441f-b1bc-afad763a6207",
		isActive: true,
		name: "Norbert Landa",
	},
	{
		id: "da85c632-13c4-42e0-a6bf-7d54febd482f",
		isActive: true,
		name: "Tim Warnes",
	},
	{
		id: "1ec2bdba-bcbe-4a69-a44a-0d81ac3ba6a5",
		isActive: true,
		name: "Michele de Souza Lima",
	},
	{
		id: "3fcf16f2-9400-47bd-9be6-472756104ae6",
		isActive: true,
		name: "Antoine de Saint-Exupéry",
	},
	{
		id: "eb32ffda-3457-45e2-a7fb-82a017aae4c5",
		isActive: true,
		name: "Machado de Assis",
	},
];

export const authorFormSchema = z.object({
	id: z.string().optional(),
	isActive: z.boolean().optional(),
	name: z.string().min(2, { message: "O nome do autor deve ser informado." }),
});

export type AuthorProps = z.infer<typeof authorFormSchema>;

type AuthorStoreProps = {
	authors: AuthorProps[];
	error: null | string | unknown;
	getAuthors: () => void;
	addAuthor: (author: Omit<AuthorProps, "id" | "isActive">) => void;
	disableAuthor: (author: AuthorProps) => void;
	updateAuthor: (author: AuthorProps) => void;
};

export const useAuthorStore = create<AuthorStoreProps>()(
	persist(
		(set) => ({
			authors: [],
			error: null,

			getAuthors: async () => {
				try {
					set({ authors: authorsData, error: null });
				} catch (err) {
					toast("Erro inesperado ao buscar autores!");
					set({ error: err });
				}
			},

			addAuthor: (author) => {
				try {
					set((state) => ({
						authors: [
							...state.authors,
							{
								id: uuidv4(),
								isActive: true,
								...author,
							},
						],
					}));
					toast.success("Autor adicionado com sucesso!");
				} catch (err) {
					console.error(err);
					toast.error("Erro inesperado ao adicionar autor!");
					set({ error: err });
				}
			},

			disableAuthor: (author) => {
				try {
					set((state) => ({
						authors: state.authors.map((a) =>
							a.id === author.id ? { ...a, isActive: false } : a,
						),
					}));
					toast.success("Autor desativado com sucesso!");
				} catch (err) {
					console.error(err);
					toast.error("Erro inesperado ao desativar autor!");
					set({ error: err });
				}
			},

			updateAuthor: (author) => {
				try {
					set((state) => ({
						authors: state.authors.map((a) =>
							a.id === author.id ? author : a,
						),
					}));
					toast.success("Autor atualizado com sucesso!");
				} catch (err) {
					console.error(err);
					toast.error("Erro inesperado ao atualizar autor!");
					set({ error: err });
				}
			},
		}),
		{ name: "author-storage" },
	),
);
