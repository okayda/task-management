import { Item, List } from "@/types";

interface FindProps {
  currentBoard: List | undefined;
  targetTaskId: string | null;
}

type ItemResult = Item | undefined;

export const findItem = function ({
  currentBoard,
  targetTaskId,
}: FindProps): ItemResult {
  if (!currentBoard) return undefined;

  const columns = Object.values(currentBoard.columns);
  const getItem: ItemResult = columns
    .flat()
    .find((item) => item.itemId === targetTaskId);

  return getItem;
};

export const findCurrentColumns = function ({
  currentBoard,
  targetTaskId,
}: FindProps) {
  if (currentBoard) {
    const columns = currentBoard.columns;

    for (const [key, items] of Object.entries(columns)) {
      for (const li of items) {
        if (li.itemId === targetTaskId) return key;
      }
    }
  }
};
