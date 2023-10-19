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
