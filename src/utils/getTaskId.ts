export function getTaskId(task: Task) {
  return `${task.title}-${task.createdAt}`;
}