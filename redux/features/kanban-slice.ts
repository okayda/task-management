import { createSlice } from "@reduxjs/toolkit";
import { initialKanbanState } from "../initialState";

import { handleThemeChange, handleChangeBoard } from "../actions/change-action";
import {
  handleAddTask,
  handleAddColumn,
  handleAddBoardDrag,
} from "../actions/add-action";

import {
  handleUpdateSubTasksItem,
  handleUpdateStatusItem,
  handleUpdatePosition,
} from "../actions/update-action";

export const kanban = createSlice({
  name: "kanban",
  initialState: initialKanbanState,
  reducers: {
    // kanban-action.ts
    // assigining the existed data from localStorage into the Redux store
    replaceKanban(state, action) {
      state.data = action.payload.data;
    },

    // SideNavList Component
    changeTheme(state, action) {
      handleThemeChange(state, action.payload.theme);
    },

    // SideNavList Component
    changeBoard(state, action) {
      handleChangeBoard(state, action.payload.titleId);
    },

    // AddTask Component
    addTask(state, action) {
      handleAddTask(state, action.payload);
    },

    // AddColumnBoard Component
    addColumn(state, action) {
      handleAddColumn(state, action.payload.newColumn);
    },

    // AddBoardDrag Component
    addBoardDrag(state, action) {
      handleAddBoardDrag(state, action.payload);
    },

    // Modals TaskItem Component
    updateSubTasksItem(state, action) {
      handleUpdateSubTasksItem(state, action.payload);
    },

    // Modals TaskItem Component
    // updatePosition() only used for accurate position change
    // they're not the same with updateStatusItem();
    updateStatusItem(state, action) {
      handleUpdateStatusItem(state, action.payload);
    },

    // Drag Component
    // Every Drag and Drop the user make will goona be executed
    // updateStatusItem() only used for simple position change
    // they're not the same with updatePosition();
    updatePosition(state, action) {
      handleUpdatePosition(state, action.payload);
    },
  },
});

export default kanban.reducer;

export const {
  replaceKanban,
  addTask,
  addColumn,
  addBoardDrag,
  updateSubTasksItem,
  updateStatusItem,
  changeTheme,
  changeBoard,
  updatePosition,
} = kanban.actions;
