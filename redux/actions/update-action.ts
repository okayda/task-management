import { TypeKanban, SubTasks, Item, List } from "@/types";

export const handleUpdateSubTasksItem = function (
  state: { data: TypeKanban },
  action: {
    targetTaskId: string;
    updatedSubTasks: SubTasks[];
    targetColumn: string;
  }
) {
  const { targetTaskId, updatedSubTasks, targetColumn } = action;

  const list = state.data.sideNavList;

  const currentBoard: List | undefined = list.find((li) => li.isActive);
  const currentTask: Item | undefined = currentBoard?.columns[
    targetColumn
  ].values.find((li) => li.itemId === targetTaskId);

  if (!currentTask) return;

  currentTask.subTasks = updatedSubTasks;
};

export const handleUpdateStatusItem = function (
  state: { data: TypeKanban },
  action: { targetTaskId: string; currColumn: string; newColumn: string }
) {
  const { targetTaskId, currColumn, newColumn } = action;

  const list = state.data.sideNavList;
  const currentBoard: List | undefined = list.find((li) => li.isActive);

  if (!currentBoard) return;
  // change item into a different column
  const targetItem: Item | undefined = currentBoard.columns[
    currColumn
  ].values.find((item) => item.itemId === targetTaskId);

  if (!targetItem) return;
  currentBoard.columns[newColumn].values.push(targetItem);

  //remove item from the previous column
  const updated = currentBoard.columns[currColumn].values.filter(
    (item) => item.itemId !== targetTaskId
  );

  currentBoard.columns[currColumn].values = updated;
};

export const handleUpdatePosition = function (
  state: { data: TypeKanban },
  action: { targetId: string; newPosition: any }
) {
  const { targetId, newPosition } = action;

  const list = state.data.sideNavList;
  const index = list.findIndex((li) => li.titleId === targetId);

  if (index === -1) return;

  const updatedDrag = {
    ...list[index],
    columns: newPosition,
  };

  state.data.sideNavList = [
    ...list.slice(0, index),
    updatedDrag,
    ...list.slice(index + 1),
  ];
};
