import { Items } from "@/constants/types";

interface DataObj {
  [key: string]: { name: string; items: Items };
}

interface Obj {
  [key: string]: Items[] | {};
}

interface ColumnsObj {
  [key: string]: {
    name: string;
    items: Items[];
  };
}

// removing the: name & items and assigning only the Array values
// {name: 'doing', items: [{}, {}]}
const formatData = function (dataObj: DataObj): Obj {
  const obj: Obj = {};

  for (const [key, value] of Object.entries(dataObj)) {
    obj[key] = value.items;
  }

  return obj;
};

export const onDragEnd = function (
  result: any,
  columnsObj: ColumnsObj,
  updateDrag: (newPosition: Obj) => void
): void {
  if (!result.destination) return;
  const { source, destination } = result;

  let obj: Obj = {};

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columnsObj[source.droppableId];
    const destColumn = columnsObj[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    const updatedData = {
      ...columnsObj,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    };

    obj = formatData(updatedData);
  } else {
    const column = columnsObj[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);

    const updatedData = {
      ...columnsObj,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    };

    obj = formatData(updatedData);
  }

  updateDrag(obj);
};
