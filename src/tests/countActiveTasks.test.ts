import { describe, test, expect } from "vitest"
import {countActiveTasks} from "../utils/countActiveTasks.ts";

describe('active tasks counting should work correctly', () => {
  test('should return 0 when there are no tasks', () => {
    expect(countActiveTasks([])).toBe(0);
  });

  test('should return 1 when there is 1 active task', () => {
    expect(countActiveTasks([{title: "", createdAt: 0, isDone: false}])).toBe(1);
  });

  test('should return 2 when there are 2 active tasks', () => {
    expect(countActiveTasks([{title: "", createdAt: 0, isDone: false}, {title: "", createdAt: 0, isDone: false}])).toBe(2);
  });

  test('should return 1 when there are 1 active tasks and 1 done task', () => {
    expect(countActiveTasks([{title: "", createdAt: 0, isDone: false}, {title: "", createdAt: 0, isDone: true}])).toBe(1);
  });
});