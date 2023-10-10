import { createSlice } from "@reduxjs/toolkit";
import { TypeKanban, Item, List } from "@/types";

const initialState = {
  data: {
    userId: "",
    name: "",
    isDarkTheme: false,
    sideNavList: [
      {
        titleId: "",
        title: "",
        isActive: false,
        columns: {
          todo: {
            columnId: "",
            values: [],
          },
          doiing: {
            columnId: "",
            values: [],
          },
          done: {
            columnId: "",
            values: [],
          },
        },
      },
    ],
  } as TypeKanban,
};

export const kanban = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    // kanban-action.ts
    // assigining the existed data from localStorage into the Redux store
    replaceKanban(state, action) {
      state.data = action.payload.data;
    },

    // SideNavList Component
    changeTheme(state, action) {
      state.data.isDarkTheme = action.payload.theme;
    },

    // SideNavList Component
    changeBoard(state, action) {
      const targetId = action.payload.titleId;

      const list = state.data.sideNavList;
      const currentBoard = list.findIndex((li) => li.isActive);

      // No change (if the user click the current active board)
      if (list[currentBoard].titleId === targetId) return;

      // disabled the previous active board
      list[currentBoard].isActive = false;

      // enabled the new active board
      list.forEach((li) => {
        if (li.titleId === targetId) {
          li.isActive = true;
          return;
        }
      });
    },

    // AddTask Component
    addTask(state, action) {
      const { formData, targetColumn } = action.payload;

      const list = state.data.sideNavList;
      const currentBoard: List | undefined = list.find((li) => li.isActive);

      if (!currentBoard) return;

      currentBoard.columns[targetColumn].values.push(formData);
    },

    // AddColumn Component
    addColumn(state, action) {
      const updatedColumn = action.payload.updatedColumn;

      const list = state.data.sideNavList;
      const currentBoard: List | undefined = list.find((li) => li.isActive);

      if (!currentBoard) return;

      // for (const [key, value] of Object.entries(currentBoard.columns)) {

      // }
      updatedColumn.forEach((el: any, i: number) => {});
    },

    // ModalTask Component
    updateSubTasksItem(state, action) {
      const { targetTaskId, updatedSubTasks, targetColumn } = action.payload;

      const list = state.data.sideNavList;

      const currentBoard: List | undefined = list.find((li) => li.isActive);
      const currentTask: Item | undefined = currentBoard?.columns[
        targetColumn
      ].values.find((li) => li.itemId === targetTaskId);

      if (!currentTask) return;

      currentTask.subTasks = updatedSubTasks;
    },

    // ModalTask Component
    // updatePosition() only used for accurate position change
    // they're not the same with updateStatusItem();
    updateStatusItem(state, action) {
      const { targetTaskId, currColumn, newColumn } = action.payload;
      const list = state.data.sideNavList;
      const currentBoard: List | undefined = list.find((li) => li.isActive);

      if (!currentBoard) return;

      // change item into a different column
      const targetItem: Item | undefined = currentBoard.columns[
        currColumn
      ].values.find((item) => item.itemId === targetTaskId);

      if (!targetItem) return;

      currentBoard.columns[newColumn].values.push(targetItem);

      //remove item from the previous column
      const updated = currentBoard.columns[currColumn].values.filter(
        (item) => item.itemId !== targetTaskId
      );

      currentBoard.columns[currColumn].values = updated;
    },

    // Drag Component
    // Every Drag and Drop the user make will goona be executed
    // updateStatusItem() only used for simple position change
    // they're not the same with updatePosition();
    updatePosition(state, action) {
      const { targetId, newPosition } = action.payload;

      const list = state.data.sideNavList;
      const index = list.findIndex((li) => li.titleId === targetId);

      if (index === -1) return;

      const updatedDrag = {
        ...list[index],
        columns: newPosition,
      };

      state.data.sideNavList = [
        ...list.slice(0, index),
        updatedDrag,
        ...list.slice(index + 1),
      ];
    },
  },
});

export default kanban.reducer;

export const {
  replaceKanban,
  addTask,
  addColumn,
  updateSubTasksItem,
  updateStatusItem,
  changeTheme,
  changeBoard,
  updatePosition,
} = kanban.actions;
