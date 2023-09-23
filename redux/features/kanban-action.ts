import { TypeKanban } from "@/constants/types";
import { replaceKanban } from "./kanban-slice";
import { v4 as uuidv4 } from "uuid";
import { dataList } from "@/constants/data";

export const getData = function () {
  return function (dispatch: any) {
    // default kanban data
    let data: TypeKanban = {
      userId: uuidv4(),
      name: "John Doe",
      isDarkTheme: false,
      sideNavList: dataList.map((li: any) => {
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
