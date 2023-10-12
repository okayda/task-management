import { Item, List } from "@/types";

interface FindItemProps {
  currentBoard: List | undefined;
  currentColumn: string | undefined;
  targetTaskId: string | null;
}

interface FindProps {
  currentBoard: List | undefined;
  targetTaskId: string | null;
}

type ItemResult = Item | undefined;

export const findItem = function ({
  currentBoard,
  currentColumn,
  targetTaskId,
}: FindItemProps): ItemResult {
  if (!currentBoard || !currentColumn) return;

  const currentColumnData = currentBoard.columns[currentColumn];
  const getItem: ItemResult = currentColumnData.values.find(
    (item) => item.itemId === targetTaskId
  );

  return getItem;
};

export const findCurrentColumns = function ({
  currentBoard,
  targetTaskId,
}: FindProps) {
  if (!currentBoard) return;

  const columns = currentBoard.columns;

  for (const [key, items] of Object.entries(columns)) {
    for (const li of items.values) {
      if (li.itemId === targetTaskId) return key;
    }
  }
};
