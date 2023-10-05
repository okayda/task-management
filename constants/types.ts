import { AppDispatch } from "@/redux/store";

export type SubTasks = { subTitle: string; isComplete: boolean };

export type Item = {
  itemId: string;
  itemTitle: string;
  description: string;
  subTasks: SubTasks[];
};

export type List = {
  titleId: string;
  title: string;
  isActive: boolean;
  columns: {
    [key: string]: Item[];
  };
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
