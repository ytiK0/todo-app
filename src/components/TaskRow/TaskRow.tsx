import styles from "./taskRow.module.css";
import {getTaskId} from "../../utils/getTaskId.ts";
import {type ChangeEvent, useCallback} from "react";
import {clx} from "../../utils/clx.ts";

interface TaskRowProps {
  task: Task;
  onChange: (task: Task) => void;
}

export default function TaskRow({ task, onChange }: TaskRowProps) {
  const id = getTaskId(task);
  const { title, isDone } = task;

  const handelDoneChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    const target = ev.target as HTMLInputElement;
    onChange({ ...task, isDone: target.checked });
  }, [task, onChange])

  return (
    <label className={styles.rowWrapper} htmlFor={id}>
      <input
        type="checkbox"
        id={id}
        checked={isDone}
        className={styles.doneCheckbox}
        onChange={handelDoneChange}
      />
      <span className={clx(styles.taskTitle, isDone && styles.taskTitle__done)}>{title}</span>
    </label>
  );
}
