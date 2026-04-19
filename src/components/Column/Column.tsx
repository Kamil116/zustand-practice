import clsx from "clsx";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import Task from "@/components/Task/Task.tsx";
import { useStore } from "@/store.ts";
import type { ColumnState } from "@/types/types.ts";
import styles from "./Column.module.css";

function Column({ state }: { state: ColumnState }) {
	const [open, setOpen] = useState(false);
	const [newTask, setNewTask] = useState("");
	const [drop, setDrop] = useState(false);

	const tasks = useStore(useShallow((store) => store.tasks.filter((task) => task.state === state)));
	const addTask = useStore((store) => store.addTask);
	const setDraggedTask = useStore((store) => store.setDraggedTask);
	const draggedTask = useStore((store) => store.draggedTask);
	const moveTask = useStore((store) => store.moveTask);

	const handleClick = () => {
		setOpen(true);
	};

	return (
		<>
			<section
				className={clsx(styles.column, drop && styles.drop)}
				aria-label={`${state} tasks`} // для скринридеров, для доступности
				onDragOver={(e) => {
					e.preventDefault();
					setDrop(true);
				}}
				onDragLeave={(e) => {
					e.preventDefault();
					setDrop(false);
				}}
				onDrop={() => {
					if (!draggedTask) {
						return;
					}

					setDraggedTask(null);
					moveTask(draggedTask, state);
					setDrop(false);
				}}
			>
				<div className={styles.header}>
					{state}
					<button type="button" onClick={handleClick}>
						Add
					</button>
				</div>

				{tasks.map((task) => (
					<Task task={task} key={task.title} />
				))}
			</section>
			{open && (
				<div className={styles.modal}>
					<div className={styles.modalContent}>
						<input
							placeholder={"Todo"}
							value={newTask}
							onChange={(ev) => {
								setNewTask(ev.target.value);
							}}
						/>
						<button
							type="button"
							onClick={() => {
								addTask(newTask, state);
								setNewTask("");
								setOpen(false);
							}}
						>
							Submit
						</button>
					</div>
				</div>
			)}
		</>
	);
}

export default Column;
