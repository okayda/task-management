import { data1, data2, data3, data4, data5 } from "./data";

export const dataList = [
  {
    // titleId will gonna be created by uuidv4() at kanban-action.ts
    title: "Platform Launch",
    isActive: true,
    columns: {
      // same with each (values) itemId at kanban-action.ts
      todo: data1,
      doing: data2,
      done: data3,
    },
  },

  {
    // titleId will gonna be created by uuidv4() at kanban-action.ts
    title: "Marketing Plan",
    isActive: false,
    columns: {
      // same with each (values) itemId at kanban-action.ts
      todo: data4,
      doing: [],
    },
  },

  {
    // titleId will gonna be created by uuidv4() at kanban-action.ts
    title: "Roadmap",
    isActive: false,
    columns: {
      // same with each (values) itemId at kanban-action.ts
      now: data5,
      next: [],
      later: [],
    },
  },
];
