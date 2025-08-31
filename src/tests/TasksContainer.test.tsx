import {test} from "vitest";
import {render, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import App from "../App.tsx";

const tasks: Task[] = [
  {
    title: 'Buy groceries',
    createdAt: 1,
    isDone: false
  },
  {
    title: 'Finish report',
    createdAt: 2,
    isDone: false
  },
  {
    title: 'Call mom',
    createdAt: 3,
    isDone: false
  },
  {
    title: 'Clean the house',
    createdAt: 4,
    isDone: true
  },
  {
    title: 'Read a book',
    createdAt: 5,
    isDone: false
  }
];

beforeEach(() => {
  localStorage.clear()
  localStorage.setItem("tasks", JSON.stringify(tasks));
})

test("should render correct row count", async () => {
  render(<App />);

  const taskContainer = screen.getByTestId("tasks-container");


  expect(taskContainer.childElementCount).toBe(5);
});

test("done task should toggle checkboxes", async () => {
  render(<App />);

  const taskContainer = screen.getByTestId("tasks-container");

  const taskRows = Array.from(taskContainer.children);

  await userEvent.click(taskRows[0]);
  await userEvent.click(taskRows[2]);
  await userEvent.click(taskRows[3]);

  const checkboxes = taskContainer.querySelectorAll('input[type="checkbox"]');
  const checked = (Array.from(checkboxes) as HTMLInputElement[]).filter(cb => cb.checked);

  expect(checked.length).toBe(2);
});