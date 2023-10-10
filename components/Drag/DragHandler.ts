import { Item } from "@/types";

type DataObj = {
  [key: string]: {
    name: string;
    items: {
      columnId: string;
      values: Item[];
    };
  };
};

type Obj = {
  [key: string]: {
    columnId: string;
    values: Item[];
  };
};

type ColumnsObj = {
  [key: string]: {
    name: string;
    items: {
      columnId: string;
      values: Item[];
    };
  };
};

// raw data {name: name, items: {...}}
// returning data {columnId: id ,values: data[]}
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
    // from (item column)
    const sourceColumn = columnsObj[source.droppableId];
    // new (item column)
    const destColumn = columnsObj[destination.droppableId];

    const sourceId = sourceColumn.items.columnId;
    const sourceItems = [...sourceColumn.items.values];

    const destId = destColumn.items.columnId;
    const destItems = [...destColumn.items.values];

    const [removed] = sourceItems.splice(source.index, 1);

    destItems.splice(destination.index, 0, removed);

    const updatedData = {
      ...columnsObj,
      [source.droppableId]: {
        ...sourceColumn,
        items: {
          columnId: sourceId,
          values: sourceItems,
        },
      },
      [destination.droppableId]: {
        ...destColumn,
        items: {
          columnId: destId,
          values: destItems,
        },
      },
    };

    obj = formatData(updatedData);
  } else {
    const column = columnsObj[source.droppableId];
    const copiedId = column.items.columnId;
    const copiedItems = [...column.items.values];

    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);

    const updatedData = {
      ...columnsObj,
      [source.droppableId]: {
        ...column,
        items: {
          columnId: copiedId,
          values: copiedItems,
        },
      },
    };

    obj = formatData(updatedData);
  }

  updateDrag(obj);
};
