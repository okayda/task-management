import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    showAddTask: false,

    // targetTaskId will only change to the valid id
    // if the display turn to "true" basically was used to display the modal
    showTaskItem: {
      display: false,
      targetTaskId: null,
    },
  },
};

export const display = createSlice({
  name: "display",
  initialState,
  reducers: {
    toggleAddTask(state, action) {
      state.data.showAddTask = action.payload.showAddTask;
    },

    toggleModalTask(state, action) {
      state.data.showTaskItem = action.payload.showModalTask;
    },
  },
});

export default display.reducer;

export const { toggleAddTask, toggleModalTask } = display.actions;
