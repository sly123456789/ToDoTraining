import { createSlice } from "@reduxjs/toolkit";
import { tasks } from "../../data/TasksStorage";
import type { Task } from "../../types/tasks";

const initialState: Task[] = tasks;

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    updateTask: (state, action) => {
      state.map((task) =>
        task.id === action.payload.id ? action.payload : task,
      );
    },
  },
});

export const { addTask, updateTask } = tasksSlice.actions;
export default tasksSlice.reducer;
