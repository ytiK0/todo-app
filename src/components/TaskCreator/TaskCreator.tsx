import {useCallback, useState, type KeyboardEvent, type ChangeEvent} from "react";
import style from "./taskCreator.module.css";

interface TaskCreatorProps {
  onTaskAdd: (task: Task) => void;
}

export default function TaskCreator({ onTaskAdd }: TaskCreatorProps) {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleTaskAdd = useCallback((ev: KeyboardEvent) => {
    if (ev.key === "Enter" && newTaskTitle.trim().length >= 1) {
      onTaskAdd({ title: newTaskTitle, isDone: false, createdAt: Date.now() });
      setNewTaskTitle("");
    }
  }, [onTaskAdd, newTaskTitle]);

  const handleTaskChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(ev.target.value);
  }, []);

  return (
    <>
      <input
        type="text"
        placeholder="What needs to done?"
        data-testid="task-input"
        className={style.taskInput}
        value={newTaskTitle}
        onChange={handleTaskChange}
        onKeyDown={handleTaskAdd}
      />
    </>
  );
}
