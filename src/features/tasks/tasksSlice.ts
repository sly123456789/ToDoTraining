import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { tasks } from "../../data/TasksStorage";
import type { Task } from "../../types/tasks";
import type { RootState } from "../../app/store";

const tasksAdapter = createEntityAdapter<Task>();

const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksAdapter.getInitialState({}, tasks),
  reducers: {
    addTask: (state, action) => {
      const { title } = action.payload;
      if (
        Object.values(state.entities).some(
          (task: Task) => task.title.toLowerCase() === title.toLowerCase(),
        )
      ) {
        throw new Error("Task with that title already exists");
      }

      tasksAdapter.addOne(state, action.payload);
    },
    updateTask: tasksAdapter.updateOne,
  },
});

export const { addTask, updateTask } = tasksSlice.actions;
export default tasksSlice.reducer;

export const { selectById: selectTaskById, selectIds: selectTasksIds } = tasksAdapter.getSelectors(
  (state: RootState) => state.tasks,
);
