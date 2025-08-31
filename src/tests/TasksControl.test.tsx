import {test, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import TasksControl from "../components/TasksControls/TasksControl.tsx";
import userEvent from "@testing-library/user-event";

test("change filter mode", async () => {
  const onFilterChange = vi.fn();

  render(<TasksControl filter={"all"} activeCount={1} onCompletedDelete={() => {}} onFilterChange={onFilterChange}/>);

  await userEvent.click(screen.getByText("Active"));

  expect(onFilterChange).toHaveBeenCalledWith("active");
});

test("call clear callback", async () => {
  const onClear = vi.fn();

  render(<TasksControl filter={"all"} activeCount={1} onCompletedDelete={onClear} onFilterChange={() => {}}/>);

  await userEvent.click(screen.getByText("Clear completed"));

  expect(onClear).toHaveBeenCalled();
})