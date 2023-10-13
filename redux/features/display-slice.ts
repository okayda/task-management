import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    showAddTask: false,
    showAddColumn: false,
    showAddBoardDrag: false,

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
  toggleAddColumn,
  toggleAddBoardDrag,
  toggleModalTask,
} = display.actions;
