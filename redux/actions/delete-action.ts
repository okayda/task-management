import { TypeKanban, Item, List } from "@/types";

export const handleDeleteTask = function (
  state: { data: TypeKanban },
  action: { targetTaskId: string; targetColumn: string }
) {
  const { targetTaskId, targetColumn } = action;

  const list = state.data.sideNavList;
  const currentBoard: List | undefined = list.find((li) => li.isActive);

  if (!currentBoard) return;

  // Delete the target item
  const updatedValues = currentBoard.columns[targetColumn].values.filter(
    (item: Item) => item.itemId !== targetTaskId
  );

  currentBoard.columns[targetColumn].values = updatedValues;
};

export const handleDeleteBoard = function (
  state: { data: TypeKanban },
  action: { targetBoardId: string }
) {
  const { targetBoardId } = action;

  const list = state.data.sideNavList;

  // Delete the target board
  const updatedBoards = list.filter((li: List) => li.titleId !== targetBoardId);

  // Make the first element board active
  // (basically it will make the user directed to the first board) if there is a boards exist
  if (updatedBoards.length) updatedBoards[0].isActive = true;

  state.data.sideNavList = updatedBoards;
};
