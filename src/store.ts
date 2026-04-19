import { devtools, persist } from "zustand/middleware";
import { create } from "zustand/react";
import type { ColumnState, TaskType } from "./types/types.ts";

type Store = {
	tasks: TaskType[];
	addTask: (title: string, state: ColumnState) => void;
	deleteTask: (title: string) => void;
	draggedTask: string | null;
	setDraggedTask: (title: string | null) => void;
	moveTask: (title: string, state: ColumnState) => void;
};

export const useStore = create<Store>()(
	persist(
		devtools((set) => ({
			tasks: [],
			addTask: (title, state) =>
				set(
					(store) => {
						return {
							tasks: [...store.tasks, { title, state }],
						};
					},
					false,
					"tasks/addTask",
				),
			deleteTask: (title) =>
				set(
					(store) => ({
						tasks: store.tasks.filter((task) => task.title !== title),
					}),
					false,
					"tasks/deleteTask",
				),
			draggedTask: null,
			setDraggedTask: (title) => set({ draggedTask: title }, false, "tasks/setDraggedTask"),
			moveTask: (title, state) =>
				set(
					(store) => ({
						tasks: store.tasks.map((task) => (task.title === title ? { title, state } : task)),
					}),
					false,
					"tasks/moveTask",
				),
		})),
		{
			name: "store",
		},
	),
);
