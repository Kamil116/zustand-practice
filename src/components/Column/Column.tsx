import styles from './Column.module.css'
import type {ColumnState} from "@/types/types.ts";
import Task from "@/components/Task/Task.tsx";
import {useStore} from "@/store.ts";
import {useShallow} from "zustand/react/shallow";
import {useState} from "react";
import clsx from "clsx";

function Column({state}: { state: ColumnState }) {
    const [open, setOpen] = useState(false);
    const [newTask, setNewTask] = useState('');
    const [drop, setDrop] = useState(false);

    const tasks = useStore(
        useShallow((store) =>
            store.tasks.filter((task) => task.state === state)
        )
    );
    const addTask = useStore((store) => store.addTask);
    const setDraggedTask = useStore((store) => store.setDraggedTask);
    const draggedTask = useStore((store) => store.draggedTask);
    const moveTask = useStore((store) => store.moveTask)

    const handleClick = () => {
        setOpen(true);
    }

    return (
        <>
            <div
                className={clsx(styles.column, drop && styles.drop)}
                onDragOver={e => {
                    e.preventDefault();
                    setDrop(true)
                }}
                onDragLeave={e => {
                    e.preventDefault();
                    setDrop(false)
                }}
                onDrop={() => {
                    if (!draggedTask) {
                        return;
                    }

                    setDraggedTask(null);
                    moveTask(draggedTask, state);
                    setDrop(false)
                }}>
                <div className={styles.header}>
                    {state}
                    <button onClick={handleClick}>Add</button>
                </div>

                {tasks.map((task) => (
                    <Task task={task} key={task.title}/>
                ))}
            </div>
            {open && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <input placeholder={'Todo'} value={newTask} onChange={(ev) => {
                            setNewTask(ev.target.value)
                        }}/>
                        <button onClick={() => {
                            addTask(newTask, state)
                            setNewTask('')
                            setOpen(false);
                        }}>
                            Submit
                        </button>
                    </div>
                </div>)}
        </>

    );
}

export default Column;
