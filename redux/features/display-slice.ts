import { createSlice } from "@reduxjs/toolkit";
import { initialDisplayState } from "../initialState";

export const display = createSlice({
  name: "display",
  initialState: initialDisplayState,
  reducers: {
    toggleAddTask(state, action) {
      state.data.showAddTask = action.payload.showAddTask;
    },

    toggleEditTask(state, action) {
      state.data.showEditTask = action.payload.showEditTask;
    },

    toggleAddColumn(state, action) {
      state.data.showAddColumn = action.payload.showAddColumn;
    },

    toggleAddBoardDrag(state, action) {
      state.data.showAddBoardDrag = action.payload.showAddBoardDrag;
    },

    toggleModalTask(state, action) {
      state.data.showTaskItem = action.payload.showModalTask;
    },
  },
});

export default display.reducer;

export const {
  toggleAddTask,
  toggleEditTask,
  toggleAddColumn,
  toggleAddBoardDrag,
  toggleModalTask,
} = display.actions;
