import { createSlice } from "@reduxjs/toolkit";
import { TypeKanban } from "@/constants/types";

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
          todo: [],
          doiing: [],
          done: [],
        },
      },
    ],
  } as TypeKanban,
};

export const kanban = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    replaceKanban(state, action) {
      state.data = action.payload.data;
    },

    addTask(state, action) {
      const list = state.data.sideNavList;
      const currentBoard = list.findIndex((li) => li.isActive);

      const data = action.payload.data;
      const targetColumn = action.payload.column;

      state.data.sideNavList[currentBoard].columns[targetColumn].push(data);
    },

    changeTheme(state, action) {
      state.data.isDarkTheme = action.payload.theme;
    },

    changeBoard(state, action) {
      const list = state.data.sideNavList;
      const targetId = action.payload.id;
      const activeIndexBoard = list.findIndex((li) => li.isActive);

      // Guard clause
      if (activeIndexBoard === targetId) return;

      list.forEach((li) => {
        if (li.titleId === targetId) {
          li.isActive = true;
          list[activeIndexBoard].isActive = false;
          return;
        }
      });
    },

    updatePosition(state, action) {
      const list = state.data.sideNavList;
      const { targetId, newPosition } = action.payload;
      const index = list.findIndex((li) => li.titleId === targetId);

      if (index !== -1) {
        const updatedDrag = {
          ...list[index],
          columns: newPosition,
        };

        state.data.sideNavList = [
          ...list.slice(0, index),
          updatedDrag,
          ...list.slice(index + 1),
        ];
      }
    },
  },
});

export default kanban.reducer;

export const {
  replaceKanban,
  addTask,
  changeTheme,
  changeBoard,
  updatePosition,
} = kanban.actions;
