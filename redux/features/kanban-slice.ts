import { createSlice } from "@reduxjs/toolkit";
import { initialKanbanState } from "../initialState";

import { handleThemeChange, handleChangeBoard } from "../actions/change-action";
import {
  handleAddTask,
  handleAddEditColumn,
  handleAddNewBoard,
} from "../actions/add-action";

import {
  handleUpdateSubTasksItem,
  handleUpdateStatusItem,
  handleUpdatePosition,
} from "../actions/update-action";

import { handleEditTask, handleEditBoard } from "../actions/edit-action";

import { handleDeleteTask, handleDeleteBoard } from "../actions/delete-action";

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
    addEditColumn(state, action) {
      handleAddEditColumn(state, action.payload.newColumn);
    },

    // AddBoardDrag Component
    addNewBoard(state, action) {
      handleAddNewBoard(state, action.payload);
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

    editTask(state, action) {
      handleEditTask(state, action.payload);
    },

    editBoard(state, action) {
      // board title
      handleEditBoard(state, action.payload);
      // board columns
      handleAddEditColumn(state, action.payload.newColumn);
    },

    deleteTask(state, action) {
      handleDeleteTask(state, action.payload);
    },

    deleteBoard(state, action) {
      handleDeleteBoard(state, action.payload);
    },
  },
});

export default kanban.reducer;

export const {
  replaceKanban,
  addTask,
  addEditColumn,
  addNewBoard,
  updateSubTasksItem,
  updateStatusItem,
  changeTheme,
  changeBoard,
  updatePosition,
  editTask,
  editBoard,
  deleteTask,
  deleteBoard,
} = kanban.actions;
