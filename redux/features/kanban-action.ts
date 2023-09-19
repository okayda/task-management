import { TypeKanban } from "@/constants/types";
import { replaceKanban } from "./kanban-slice";
import { v4 as uuidv4 } from "uuid";
import { data1, data2, data3, data4, data5 } from "@/constants/data";

const list = [
  {
    title: "Platform Launch",
    isActive: true,
    columns: {
      todo: data1,
      doing: data2,
      done: data3,
    },
  },

  {
    title: "Marketing Plan",
    isActive: false,
    columns: {
      todo: data4,
      doing: [],
    },
  },

  {
    title: "Roadmap",
    isActive: false,
    columns: {
      now: data5,
      next: [],
      later: [],
    },
  },
];

export const getData = function () {
  return function (dispatch: any) {
    // default kanban data
    let data: any = {
      userId: "uuid",
      name: "john doe",
      isDarkTheme: false,
      sideNavList: list.map((li: any) => {
        li.titleId = uuidv4();
        return li;
      }),
    };

    const kanban = localStorage.getItem("kanban");

    if (kanban) data = JSON.parse(kanban);

    dispatch(replaceKanban({ data }));
  };
};

export const sendData = function (kanbanData: TypeKanban) {
  return function (_: any) {
    localStorage.setItem("kanban", JSON.stringify(kanbanData));
  };
};
