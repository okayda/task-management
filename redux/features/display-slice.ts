import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    showNav: false,
  },
};

export const display = createSlice({
  name: "display",
  initialState,
  reducers: {
    toggleNav(state, action) {
      state.data.showNav = action.payload.showNav;
    },
  },
});

export default display.reducer;

export const { toggleNav } = display.actions;
