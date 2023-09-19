export type TypeKanban = {
  userId: string;
  name: string;
  isDarkTheme: boolean;
  sideNavList: {
    titleId: string;
    title: string;
    isActive: boolean;
    columns: any;
  }[];
};
