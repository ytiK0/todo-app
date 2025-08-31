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
    isDone: true
  }
];

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem("tasks", JSON.stringify(tasks));
})

describe('Task filtering', () => {
  it('applies "Active" filter correctly', async () => {
    render(<App />);

    await userEvent.click(screen.getByText('Active'));

    const tasksContainer = screen.getByTestId('tasks-container');
    expect(tasksContainer.childElementCount).toBe(3);
  });

  it('applies "Completed" filter correctly', async () => {
    render(<App />);

    await userEvent.click(screen.getByText('Done'));

    const tasksContainer = screen.getByTestId('tasks-container');
    expect(tasksContainer.childElementCount).toBe(2);
  });

  it('applies "Active" filter and then back to "All"', async () => {
    render(<App />);

    await userEvent.click(screen.getByText('Active'));
    const tasksContainer = screen.getByTestId('tasks-container');
    await userEvent.click(screen.getByText('All'));

    expect(tasksContainer.childElementCount).toBe(5);
  });
});

test("clear completed tasks", async () => {
  render(<App />);

  const taskContainer = screen.getByTestId("tasks-container");
  const taskRows = Array.from(taskContainer.children);

  await userEvent.click(taskRows[0]);
  await userEvent.click(taskRows[2]);

  await userEvent.click(screen.getByText("Clear completed"));

  const tasksContainer = screen.getByTestId("tasks-container");
  expect(tasksContainer.childElementCount).toBe(1);
});
