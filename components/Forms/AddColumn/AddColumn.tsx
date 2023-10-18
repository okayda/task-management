import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AnimatePresence } from "framer-motion";
import { ComponentProps, List, AddColumns } from "@/types";

import { toggleAddColumn } from "@/redux/features/display-slice";
import { addColumn } from "@/redux/features/kanban-slice";

import {
  ToastError,
  ToastSuccess,
} from "@/components/Animation/Standard/ToastType";

import { WrappedOverlay } from "@/components/Animation/Standard/OverlayType/OverlayType";
import Card from "@/components/Animation/Standard/Card/Card";
import SubInput from "@/components/Animation/Standard/SubInput";
import Button from "@/components/Animation/Standard/Button";

import style from "./AddColumn.module.scss";

export default function AddColumnBoard({ data, dispatch }: ComponentProps) {
  const closeAddColumnBoard = function (): void {
    dispatch(toggleAddColumn({ showAddColumn: false }));
  };

  const addColumns: AddColumns[] = [];

  const list = data.sideNavList;
  const currentBoard: List | undefined = list.find((li) => li.isActive);

  // responsible for initializing the existed columns to the subInput
  if (!currentBoard) return;

  for (const [key, value] of Object.entries(currentBoard.columns)) {
    addColumns.push({
      columnId: value.columnId,
      columnName: key,
      isNew: false,
    });
  }
  // ******************************

  const [subInput, setSubInput] = useState<AddColumns[]>(addColumns);

  const columnsLength: number = subInput.length;
  const addColumnBtn: string =
    columnsLength >= 5 ? "Only 5 Columns" : "Add New Column";

  // remove white spaces & empty input
  const columnInputs: AddColumns[] = subInput.filter((value: AddColumns) =>
    value.columnName.trim()
  );

  const addInput = function (): void {
    // adding a new subInput value
    setSubInput([
      ...subInput,
      { columnId: uuidv4(), columnName: "", isNew: true },
    ]);
  };

  const removeInput = function (index: number): void {
    if (subInput.length === 1) return;

    // removing the subInput value
    const updatedAddInputs = [...subInput];
    updatedAddInputs.splice(index, 1);
    setSubInput(updatedAddInputs);
  };

  const handlerSubInputChange = function (i: number, value: string): void {
    // updating the specific columnName value
    const updatedAddInputs: AddColumns[] = [...subInput];
    updatedAddInputs[i].columnName = value;
    setSubInput(updatedAddInputs);
  };

  const handlerSubmit = function (e: React.FormEvent): void {
    e.preventDefault();

    // Checking if there is any values in the column inputs
    if (!columnInputs.length) {
      ToastError("Atleast one column");
      return;
    }

    ToastSuccess("Modify column applied");

    dispatch(
      addColumn({
        newColumn: columnInputs,
      })
    );

    closeAddColumnBoard();
  };

  return (
    <WrappedOverlay onClose={closeAddColumnBoard}>
      <Card onClose={closeAddColumnBoard}>
        <div
          className={style.addColumn}
          // Preventing to disappear the AddTask since the overlay is wrapped
          onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
        >
          <h2>Add New Column</h2>

          <form autoComplete="off" onSubmit={handlerSubmit}>
            <div className={style.addColumn__name}>
              <span>Name</span>
              <p>Platform Launch</p>
            </div>

            <div
              className={`${style.addColumn__subInput} ${
                !columnInputs.length && style.addColumn__error
              }`}
            >
              <span>Columns</span>

              <AnimatePresence initial={false}>
                {subInput.map((subtask: AddColumns, i: number) => (
                  <div key={i}>
                    <SubInput
                      className={`${style["addColumn__subInput--input"]} ${
                        !subtask.columnName.trim().length &&
                        style["addColumn__subInput--error"]
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
                className={style["addColumn__subInput--insert"]}
                onClick={addInput}
                disabled={columnsLength >= 5}
              >
                {addColumnBtn}
              </Button>
            </div>

            <Button type="submit" className={style.addColumn__submit}>
              Save Changes
            </Button>
          </form>
        </div>
      </Card>
    </WrappedOverlay>
  );
}
