import { TypeKanban, SubTasks, Item, List } from "@/types";

type EditTaskProps = {
  targetTaskId: string;
  title: string;
  description: string;
  subtasks: SubTasks[];
  currColumn: string;
  newColumn: string;
};

export const handleEditTask = function (
  state: { data: TypeKanban },
  action: EditTaskProps
) {
  const { targetTaskId, title, description, subtasks, currColumn, newColumn } =
    action;

  const list = state.data.sideNavList;
  const currentBoard: List | undefined = list.find((li) => li.isActive);

  if (!currentBoard) return;

  let updatedItem: Item | undefined = undefined;

  // updating the item task
  currentBoard.columns[currColumn].values.forEach((item: Item, i: number) => {
    if (item.itemId === targetTaskId) {
      updatedItem = {
        ...item,
        itemTitle: title,
        description: description,
        subTasks: subtasks,
      };

      currentBoard.columns[currColumn].values[i] = updatedItem;
      return;
    }
  });

  // if the item it is still in the same column no column changes
  if (updatedItem && currColumn !== newColumn) {
    // changing the item into a different column
    currentBoard.columns[newColumn].values.push(updatedItem);
    // **************************************

    //remove item from the previous column
    const updated = currentBoard.columns[currColumn].values.filter(
      (item) => item.itemId !== targetTaskId
    );

    // update the columns
    currentBoard.columns[currColumn].values = updated;
  }
};
