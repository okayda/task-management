import { createSlice } from "@reduxjs/toolkit";
import { initialDisplayState } from "../initialState";

export const display = createSlice({
  name: "display",
  initialState: initialDisplayState,
  reducers: {
    toggleMobileNav(state, action) {
      state.data.showMobileNav = action.payload.showMobileNav;
    },

    toggleAddTask(state, action) {
      state.data.showAddTask = action.payload.showAddTask;
    },

    toggleDeleteTask(state, action) {
      state.data.showDeleteTask = action.payload.showDeleteTask;
    },

    toggleEditTask(state, action) {
      state.data.showEditTask = action.payload.showEditTask;
    },

    toggleAddColumnBoard(state, action) {
      state.data.showAddColumnBoard = action.payload.showAddColumnBoard;
    },

    toggleAddNewBoard(state, action) {
      state.data.showAddNewBoard = action.payload.showAddNewBoard;
    },

    toggleDeleteBoard(state, action) {
      state.data.showDeleteBoard = action.payload.showDeleteBoard;
    },

    toggleEditBoard(state, action) {
      state.data.showEditBoard = action.payload.showEditBoard;
    },

    toggleModalTask(state, action) {
      state.data.showTaskItem = action.payload.showModalTask;
    },
  },
});

export default display.reducer;

export const {
  toggleMobileNav,

  toggleAddTask,
  toggleDeleteTask,

  toggleEditTask,
  toggleAddColumnBoard,

  toggleAddNewBoard,
  toggleDeleteBoard,

  toggleEditBoard,
  toggleModalTask,
} = display.actions;
