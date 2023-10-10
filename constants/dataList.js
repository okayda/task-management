import { data1, data2, data3, data4, data5 } from "./data";

export const dataList = [
  {
    // titleId will gonna be created by uuidv4() at kanban-action.ts
    title: "Platform Launch",
    isActive: true,
    columns: {
      // same with each (column obj) columnId at kanban-action.ts
      // same with (values item) itemId at kanban-action.ts
      todo: {
        values: data1,
      },
      doing: {
        values: data2,
      },
      done: {
        values: data3,
      },
    },
  },

  {
    // titleId will gonna be created by uuidv4() at kanban-action.ts
    title: "Marketing Plan",
    isActive: false,
    columns: {
      // same with each (column obj) columnId at kanban-action.ts
      // same with (values item) itemId at kanban-action.ts
      todo: {
        values: data4,
      },
      doing: {
        values: [],
      },
    },
  },

  {
    // titleId will gonna be created by uuidv4() at kanban-action.ts
    title: "Roadmap",
    isActive: false,
    columns: {
      // same with each (column obj) columnId at kanban-action.ts
      // same with (values item) itemId at kanban-action.ts
      now: {
        values: data5,
      },
      next: {
        values: [],
      },
      later: {
        values: [],
      },
    },
  },
];
