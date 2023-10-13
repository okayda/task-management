import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { AnimatePresence } from "framer-motion";
import { ComponentProps, BoardColumns } from "@/types";

import { toggleAddBoardDrag } from "@/redux/features/display-slice";

import { WrappedOverlay } from "@/components/Animation/Standard/OverlayType/OverlayType";
import Card from "@/components/Animation/Standard/Card/Card";
import SubInput from "@/components/Animation/Standard/SubInput";
import Button from "@/components/Animation/Standard/Button";

import style from "./AddBoardDrag.module.scss";

export default function AddBoardDrag({ data, dispatch }: ComponentProps) {
  const closeAddBoardDrag = function (): void {
    dispatch(toggleAddBoardDrag({ showAddBoardDrag: false }));
  };

  const boardColumns: BoardColumns[] = [
    {
      columnId: uuidv4(),
      columnName: "",
    },
  ];

  const [boardInputs, setBoardInputs] = useState<BoardColumns[]>(boardColumns);

  const columnsLength: number = boardInputs.length;
  const addColumnBtn: string =
    columnsLength >= 5 ? "Only 5 Columns" : "Add New Column";

  const addInput = function () {
    setBoardInputs([...boardInputs, { columnId: uuidv4(), columnName: "" }]);
  };

  const removeInput = function (index: number): void {
    if (boardInputs.length === 1) return;

    const updatedBoardInputs = [...boardInputs];
    updatedBoardInputs.splice(index, 1);
    setBoardInputs(updatedBoardInputs);
  };

  const handlerSubInputChange = function (i: number, value: string): void {
    const updatedBoardInputs: BoardColumns[] = [...boardInputs];
    updatedBoardInputs[i].columnName = value;
    setBoardInputs(updatedBoardInputs);
  };

  const handlerSubmit = function (e: React.FormEvent): void {
    e.preventDefault();
  };

  return (
    <WrappedOverlay onClose={closeAddBoardDrag}>
      <Card onClose={closeAddBoardDrag}>
        <div
          className={style.addBoardDrag}
          // Preventing to disappear the AddTask since the overlay is wrapped
          onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
        >
          <h2>Add New Board</h2>

          <form autoComplete="off" onSubmit={handlerSubmit}>
            <div className={style.addBoardDrag__name}>
              <label htmlFor="boardName">Name</label>
              <input type="text" name="boardName" id="boardName" required />
            </div>

            <div className={style.addBoardDrag__subInput}>
              <span>Columns</span>

              <AnimatePresence initial={false}>
                {boardInputs.map((subtask: BoardColumns, i: number) => (
                  <div key={i}>
                    <SubInput
                      className={style["addBoardDrag__subInput--input"]}
                      value={subtask.columnName}
                      onChange={(e) => handlerSubInputChange(i, e.target.value)}
                      removeSubInput={removeInput}
                      index={i}
                    />
                  </div>
                ))}
              </AnimatePresence>

              <Button
                type="button"
                className={style["addBoardDrag__subInput--insert"]}
                onClick={addInput}
                disabled={columnsLength >= 5}
              >
                {addColumnBtn}
              </Button>
            </div>

            <Button type="submit" className={style.addBoardDrag__submit}>
              Save Changes
            </Button>
          </form>
        </div>
      </Card>
    </WrappedOverlay>
  );
}
