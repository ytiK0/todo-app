export function countActiveTasks(tasks: Task[]) {
  return tasks.reduce((acc, task) => acc + (task.isDone ? 0 : 1), 0);
}