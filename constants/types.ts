export type Items = {
  id: string;
  title: string;
  description: string;
  subItems: { item: string; isComplete: boolean }[];
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
