import { TypeKanban } from "@/types";

export const handleThemeChange = function (
  state: { data: TypeKanban },
  action: boolean
) {
  state.data.isDarkTheme = action;
};

export const handleChangeBoard = function (
  state: { data: TypeKanban },
  action: string
) {
  const targetId = action;

  const list = state.data.sideNavList;
  const currentBoard = list.findIndex((li) => li.isActive);

  // No change (if the user click the current active board)
  if (list[currentBoard].titleId === targetId) return;

  // disabled the previous active board
  list[currentBoard].isActive = false;

  // enabled the new active board
  list.forEach((li) => {
    if (li.titleId === targetId) {
      li.isActive = true;
      return;
    }
  });
};
