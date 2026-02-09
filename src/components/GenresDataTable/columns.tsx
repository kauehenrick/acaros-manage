import type { ColumnDef } from "@tanstack/react-table";
import type { GenreProps } from "@/stores/GenreStore";

export const columns: ColumnDef<GenreProps>[] = [
	{
		id: "index",
		sortingFn: (rowA, rowB) => rowA.index - rowB.index,
		header: ({ column }) => (
			<p
				className="cursor-pointer"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				#
			</p>
		),
		cell: ({ row }) => <span>{row.index + 1}</span>,
	},
	{
		accessorKey: "name",
		header: ({ column }) => (
			<p
				className="cursor-pointer"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Gênero
			</p>
		),
	},
	{
		accessorKey: "actions",
		header: "Ações",
		cell: (cell) => <div className="flex space-x-4"></div>,
	},
];
