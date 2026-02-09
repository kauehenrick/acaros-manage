import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { create } from "zustand";

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
	id: z.string(),
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

export const useGenreStore = create<GenreStoreProps>((set) => ({
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

	addGenre: (genre) =>
		set((state) => ({
			genres: [
				...state.genres,
				{
					...genre,
					id: uuidv4(),
					isActive: true,
				},
			],
		})),

	disableGenre: (genre) =>
		set((state) => ({
			genres: state.genres.map((g) =>
				g.id === genre.id ? { ...g, isActive: false } : g,
			),
		})),

	updateGenre: (genre) =>
		set((state) => ({
			genres: state.genres.map((g) => (g.id === genre.id ? genre : g)),
		})),
}));
