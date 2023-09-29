import { AppDispatch } from "@/redux/store";

export type Items = {
  itemId: string;
  itemTitle: string;
  description: string;
  subTasks: { subTitle: string; isComplete: boolean }[];
};

export type TypeKanban = {
  userId: string;
  name: string;
  isDarkTheme: boolean;
  sideNavList: {
    titleId: string;
    title: string;
    isActive: boolean;
    columns: {
      [key: string]: Items[];
    };
  }[];
};

export type ComponentProps = {
  data: TypeKanban;
  dispatch: AppDispatch;
};
