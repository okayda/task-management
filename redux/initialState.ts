import { TypeKanban } from "@/types";

export const initialKanbanState = {
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
          doing: {
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

export const initialDisplayState = {
  data: {
    showHeaderEllipModal: false,

    showDesktopNav: true,
    showMobileNav: false,

    showAddTask: false,
    showAddColumnBoard: false,
    showAddNewBoard: false,
    showEditBoard: false,

    // targetTaskId will only change to the valid id if
    // the display turn to "true" basically was used to display the modal
    showDeleteBoard: {
      display: false,
      title: undefined,
      targetBoardId: null,
    },

    showTaskItem: {
      display: false,
      targetTaskId: null,
    },

    showDeleteTask: {
      display: false,
      title: undefined,
      targetTaskId: null,
      targetColumn: null,
    },

    showEditTask: {
      display: false,
      targetTaskId: null,
    },
  },
};
