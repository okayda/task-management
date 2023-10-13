import { AppDispatch } from "@/redux/store";

export type SubTasks = { subTitle: string; isComplete: boolean };

export type Item = {
  itemId: string;
  itemTitle: string;
  description: string;
  subTasks: SubTasks[];
};

export type Column = {
  [key: string]: {
    columnId: string;
    values: Item[];
  };
};

export type List = {
  titleId: string;
  title: string;
  isActive: boolean;
  columns: Column;
};

export type TypeKanban = {
  userId: string;
  name: string;
  isDarkTheme: boolean;
  sideNavList: List[];
};

export type ComponentProps = {
  data: TypeKanban;
  dispatch: AppDispatch;
};

export type BoardColumns = {
  columnId: string;
  columnName: string;
};

// Only used in AddColumn Component & AddColumn action at kanban-action.ts
export type AddColumns = {
  columnId: string;
  columnName: string;
  isNew: boolean;
};
