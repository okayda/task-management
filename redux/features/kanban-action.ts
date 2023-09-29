import { AppDispatch } from "@/redux/store";
import { TypeKanban, Items } from "@/constants/types";
import { replaceKanban } from "./kanban-slice";
import { v4 as uuidv4 } from "uuid";
import { dataList } from "@/constants/dataList";

export const getData = function () {
  return function (dispatch: AppDispatch) {
    const kanban = localStorage.getItem("kanban");
    let data: TypeKanban | null = null;

    // will used the existed kanban data
    if (kanban) data = JSON.parse(kanban);
    else {
      // will create the default kanban data
      data = {
        userId: uuidv4(),
        name: "Kanban user data",
        isDarkTheme: false,
        sideNavList: dataList.map((li: any) => {
          // initializing main titleId for specific drag board
          li.titleId = uuidv4();

          // initializing itemId for each item in the drag board
          for (const [key, _] of Object.entries(li.columns)) {
            li.columns[key].forEach((el: Items) => (el.itemId = uuidv4()));
          }

          return li;
        }),
      };
    }

    dispatch(replaceKanban({ data }));
  };
};

export const sendData = function (kanbanData: TypeKanban) {
  return function (_: any) {
    localStorage.setItem("kanban", JSON.stringify(kanbanData));
  };
};
