import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import kanbanReducer from "./features/kanban-slice";
import displayReducer from "./features/display-slice";

export const store = configureStore({
  reducer: {
    kanbanReducer,
    displayReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
