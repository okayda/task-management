import {
  TypeKanban,
  Item,
  Column,
  List,
  AddColumns,
  BoardColumns,
} from "@/types";

export const handleAddTask = function (
  state: { data: TypeKanban },
  action: { formData: Item; targetColumn: string }
) {
  const { formData, targetColumn } = action;

  const list = state.data.sideNavList;
  const currentBoard: List | undefined = list.find((li) => li.isActive);

  if (!currentBoard) return;

  currentBoard.columns[targetColumn].values.push(formData);
};

export const handleAddEditColumn = function (
  state: { data: TypeKanban },
  action: AddColumns[]
) {
  const newColumn = action;

  const list = state.data.sideNavList;
  const currentBoard: List | undefined = list.find((li) => li.isActive);

  if (!currentBoard) return;

  const existedColumns = currentBoard.columns;
  const newColumnObj: Column = {};

  newColumn.forEach((column: AddColumns) => {
    // these column vals are from the user
    const targetColumn = column.columnId;
    const newColumnName = column.columnName;
    const isNewColumn = column.isNew;

    for (const [currentColumn, value] of Object.entries(existedColumns)) {
      // if the condition passed the change
      // to the specific column will gonna happen
      if (isNewColumn) {
        newColumnObj[newColumnName] = {
          columnId: targetColumn,
          values: [],
        };
        console.log("New column");
        return;
      }

      if (newColumnName === currentColumn && value.columnId === targetColumn) {
        newColumnObj[currentColumn] = {
          ...value,
        };
        return;
      }

      if (newColumnName !== currentColumn && value.columnId === targetColumn) {
        newColumnObj[newColumnName] = {
          ...value,
        };
        return;
      }
    }
  });

  currentBoard.columns = newColumnObj;
};

export const handleAddNewBoard = function (
  state: { data: TypeKanban },
  action: {
    newBoardId: string;
    newBoardName: string;
    newBoardColumns: BoardColumns[];
  }
) {
  const { newBoardId, newBoardName, newBoardColumns } = action;

  const list = state.data.sideNavList;
  const newColumnObj: Column = {};

  // disabling the current active board
  // in order to direct the user to the newly created board
  list.forEach((li: List) => {
    if (li.isActive) {
      li.isActive = false;
      return;
    }
  });

  newBoardColumns.forEach((column: BoardColumns) => {
    const id = column.columnId;
    const name = column.columnName;

    newColumnObj[name] = {
      columnId: id,
      values: [],
    };
  });

  const newBoard: List = {
    titleId: newBoardId,
    title: newBoardName,
    isActive: true,
    columns: newColumnObj,
  };

  list.push(newBoard);
};
