import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { tasks } from "../../data/TasksStorage";
import type { Task } from "../../types/tasks";
import type { RootState } from "../../app/store";

const tasksAdapter = createEntityAdapter<Task>();

const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksAdapter.getInitialState({}, tasks),
  reducers: {
    addTask: tasksAdapter.addOne,
    updateTask: tasksAdapter.updateOne,
  },
});

export const { addTask, updateTask } = tasksSlice.actions;
export default tasksSlice.reducer;

export const { selectAll: selectAllTasks } = tasksAdapter.getSelectors(
  (state: RootState) => state.tasks,
);
