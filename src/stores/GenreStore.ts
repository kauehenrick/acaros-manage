import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const genresData: GenreProps[] = [
	{
		id: "83f59499-c6ff-400b-ad9e-f52708950fd7",
		isActive: true,
		name: "Literatura infantojuvenil",
	},
	{
		id: "9323e8f8-8001-42e5-8853-05ba6b0b9667",
		isActive: true,
		name: "Literatura clássica",
	},
	{
		id: "adf02c26-a4af-43a5-bac4-727f55f640f0",
		isActive: true,
		name: "Literatura brasileira",
	},
];

export const genreFormSchema = z.object({
	id: z.string().optional(),
	isActive: z.boolean().optional(),
	name: z.string().min(2, { message: "O nome do gênero deve ser informado." }),
});

export type GenreProps = z.infer<typeof genreFormSchema>;

type GenreStoreProps = {
	genres: GenreProps[];
	error: null | string | unknown;
	getGenres: () => void;
	addGenre: (genre: Omit<GenreProps, "id" | "isActive">) => void;
	disableGenre: (genre: GenreProps) => void;
	updateGenre: (genre: GenreProps) => void;
};

export const useGenreStore = create<GenreStoreProps>()(
	persist(
		(set) => ({
			genres: [],
			error: null,

			getGenres: async () => {
				try {
					set({ genres: genresData, error: null });
				} catch (err) {
					toast("Erro inesperado ao buscar gêneros!");
					set({ error: err });
				}
			},

			addGenre: (genre) => {
				try {
					set((state) => ({
						genres: [
							...state.genres,
							{
								id: uuidv4(),
								isActive: true,
								...genre,
							},
						],
					}));
					toast.success("Gênero adicionado com sucesso!");
				} catch (err) {
					console.error(err);
					toast.error("Erro inesperado ao adicionar gênero!");
					set({ error: err });
				}
			},

			disableGenre: (genre) => {
				try {
					set((state) => ({
						genres: state.genres.map((g) =>
							g.id === genre.id ? { ...g, isActive: false } : g,
						),
					}));
					toast.success("Gênero desativado com sucesso!");
				} catch (err) {
					console.error(err);
					toast.error("Erro inesperado ao desativar gênero!");
					set({ error: err });
				}
			},

			updateGenre: (genre) => {
				try {
					set((state) => ({
						genres: state.genres.map((g) => (g.id === genre.id ? genre : g)),
					}));
					toast.success("Gênero atualizado com sucesso!");
				} catch (err) {
					console.error(err);
					toast.error("Erro inesperado ao atualizar gênero!");
					set({ error: err });
				}
			},
		}),
		{
			name: "genre-storage",
		},
	),
);
