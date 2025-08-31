import styles from './app.module.css'
import {useCallback, useEffect, useState} from "react";
import TaskRow from "./components/TaskRow/TaskRow.tsx";
import {getTaskId} from "./utils/getTaskId.ts";
import TasksControl from "./components/TasksControls/TasksControl.tsx";
import {countActiveTasks} from "./utils/countActiveTasks.ts";
import TaskCreator from "./components/TaskCreator/TaskCreator.tsx";

const filters: Record<Filter, (task: Task) => boolean> = {
  all: () => true,
  active: (task: Task) => !task.isDone,
  done: (task: Task) => task.isDone
}

function App() {
  const [filter, setFilter] = useState<keyof typeof filters>('all');
  const [tasks, setTasks] = useState<Task[]>(() => {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  });

  const handelTaskChange = useCallback((task: Task) => {
    const changeTaskId = getTaskId(task);

    setTasks((prev) => prev.map((prevTask) => getTaskId(prevTask) === changeTaskId ? task : prevTask))
  }, []);

  const handleFilterChange = useCallback((filter: Filter) => {
    setFilter(filter);
  }, []);

  const handleCompletedDelete = useCallback(() => {
    setTasks((prev) => prev.filter((task) => !task.isDone));
  }, []);

  const handleTaskAdd = useCallback((task: Task) => {
    setTasks((prev) => [task, ...prev]);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks])

  return (
    <div style={{padding: 8}}>
      <div className={styles.todoWidget}>
        <TaskCreator onTaskAdd={handleTaskAdd}/>
        <div className={styles.tasksContainer} data-testid={"tasks-container"}>
            {
              tasks.filter(filters[filter]).map(task =>
                  <TaskRow key={getTaskId(task)} task={task} onChange={handelTaskChange} />
              )
            }
        </div>
        <TasksControl
          activeCount={countActiveTasks(tasks)}
          filter={filter}
          onFilterChange={handleFilterChange}
          onCompletedDelete={handleCompletedDelete}
        />
      </div>
    </div>
  )
}

export default App
