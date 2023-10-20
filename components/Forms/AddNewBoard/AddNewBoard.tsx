import { useState, ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";

import { AnimatePresence } from "framer-motion";
import { ComponentProps, BoardColumns } from "@/types";

import { toggleAddNewBoard } from "@/redux/features/display-slice";
import { addNewBoard } from "@/redux/features/kanban-slice";

import {
  ToastError,
  ToastSuccess,
} from "@/components/Animation/Standard/ToastType";

import { WrappedOverlay } from "@/components/Animation/Standard/OverlayType/OverlayType";
import Card from "@/components/Animation/Standard/Card/Card";
import TitleInput from "@/components/Animation/Standard/TitleInput";
import SubInput from "@/components/Animation/Standard/SubInput";
import Button from "@/components/Animation/Standard/Button";

import style from "./AddNewBoard.module.scss";

export default function AddNewBoard({ data, dispatch }: ComponentProps) {
  const closeAddNewBoard = function (): void {
    dispatch(toggleAddNewBoard({ showAddNewBoard: false }));
  };

  const boardColumns: BoardColumns[] = [
    {
      columnId: uuidv4(),
      columnName: "",
    },
  ];

  const [title, setTitle] = useState("");
  const [boardInputs, setBoardInputs] = useState<BoardColumns[]>(boardColumns);

  const isEmptyTitle = Boolean(title?.trim());

  const columnsLength: number = boardInputs.length;
  const addColumnBtn: string =
    columnsLength >= 5 ? "Only 5 Columns" : "Add New Column";

  // remove white spaces & empty input
  const columnInputs: BoardColumns[] = boardInputs.filter(
    (value: BoardColumns) => value.columnName.trim()
  );

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

    // checking valid title
    if (!isEmptyTitle) {
      ToastError("Name should not be empty");
      setTitle("");
      return;
    }

    // Checking if there is any values in the column inputs
    if (!columnInputs.length) {
      ToastError("Atleast one column");
      return;
    }

    ToastSuccess("Created new board");

    dispatch(
      addNewBoard({
        newBoardId: uuidv4(),
        newBoardName: title,
        newBoardColumns: columnInputs,
      })
    );

    closeAddNewBoard();
  };

  return (
    <WrappedOverlay onClose={closeAddNewBoard}>
      <Card onClose={closeAddNewBoard}>
        <div
          className={style.addBoardDrag}
          // Preventing to disappear the AddTask since the overlay is wrapped
          onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
        >
          <h2>Add New Board</h2>

          <form autoComplete="off" onSubmit={handlerSubmit}>
            <TitleInput
              title="Name"
              className={`${style.addBoardDrag__title} ${
                !isEmptyTitle && style.addBoardDrag__errorTitle
              }`}
              onChange={setTitle}
              value={title}
            />

            <div
              className={`${style.addBoardDrag__subtask} ${
                !columnInputs.length && style.addBoardDrag__error
              }`}
            >
              <span>Columns</span>

              <AnimatePresence initial={false}>
                {boardInputs.map((subtask: BoardColumns, i: number) => (
                  <div key={i}>
                    <SubInput
                      className={`${style["addBoardDrag__subtask--input"]}  ${
                        !subtask.columnName.trim().length &&
                        style["addBoardDrag__subtask--error"]
                      }`}
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
                className={style["addBoardDrag__subtask--insert"]}
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
