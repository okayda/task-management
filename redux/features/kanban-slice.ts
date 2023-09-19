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

    changeTheme(state, action) {
      state.data.isDarkTheme = action.payload.theme;
    },

    updatePosition(state, action) {
      const { targetId, newPosition } = action.payload;
      const index = state.data.sideNavList.findIndex(
        (li) => li.titleId === targetId
      );

      if (index !== -1) {
        const updatedDrag = {
          ...state.data.sideNavList[index],
          columns: newPosition,
        };

        state.data.sideNavList = [
          ...state.data.sideNavList.slice(0, index),
          updatedDrag,
          ...state.data.sideNavList.slice(index + 1),
        ];
      }
    },
  },
});

export default kanban.reducer;

export const { replaceKanban, changeTheme, updatePosition } = kanban.actions;
