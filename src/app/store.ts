import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "../features/tasks/tasksSlice";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: { tasks: tasksSlice },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;