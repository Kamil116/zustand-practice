import clsx from "clsx";
import Trash from "@/components/icons/Trash.tsx";
import { useStore } from "@/store.ts";
import type { TaskType } from "@/types/types.ts";
import styles from "./Task.module.css";

function Task({ task }: { task: TaskType }) {
	const setDraggedTask = useStore((store) => store.setDraggedTask);
	const deleteTask = useStore((store) => store.deleteTask);

	return (
		<section
			aria-label={`Task ${task.title}`}
			className={styles.task}
			draggable
			onDragStart={() => {
				setDraggedTask(task.title);
			}}
		>
			{task.title}
			<div className={styles.bottomWrapper}>
				<div className={styles.deleteTask}>
					<Trash onClick={() => deleteTask(task.title)} />
				</div>
				<div className={clsx(styles.status, styles[task.state])}>{task.state}</div>
			</div>
		</section>
	);
}

export default Task;
