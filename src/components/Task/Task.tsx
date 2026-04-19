import styles from './Task.module.css'
import clsx from "clsx";
import {useStore} from "@/store.ts";
import Trash from "@/components/icons/Trash.tsx";
import type {TaskType} from "@/types/types.ts";

function Task({task}: { task: TaskType }) {
    const setDraggedTask = useStore(store => store.setDraggedTask)
    const deleteTask = useStore((store) => store.deleteTask)

    return (
        <div className={styles.task} draggable onDragStart={() => {
            setDraggedTask(task.title)
        }}>
            {task.title}
            <div className={styles.bottomWrapper}>
                <div className={styles.deleteTask}>
                    <Trash onClick={() => deleteTask(task.title)}/>
                </div>
                <div className={clsx(styles.status, styles[task.state])}>
                    {task.state}
                </div>

            </div>
        </div>
    );
}

export default Task;
