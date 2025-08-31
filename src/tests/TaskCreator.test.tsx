import {test, vi} from "vitest";
import TaskCreator from "../components/TaskCreator/TaskCreator.tsx";
import {render, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event'

test("input should return correct task and clear value", async () => {
  const newTaskTitle = "Test task";

  const onTaskAdd = vi.fn();
  render(<TaskCreator onTaskAdd={onTaskAdd} />);

  const input = screen.getByTestId("task-input");
  await userEvent.type(input, newTaskTitle);
  await userEvent.keyboard("{Enter}");

  expect(onTaskAdd).toHaveBeenCalledWith({
    title: newTaskTitle,
    isDone: false,
    createdAt: expect.any(Number)
  });
  expect(input).toHaveValue("");
})