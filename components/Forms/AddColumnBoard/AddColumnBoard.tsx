import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AnimatePresence } from "framer-motion";
import { ComponentProps, List, AddColumns } from "@/types";

import {
  toggleAddColumnBoard,
  toggleEditBoard,
} from "@/redux/features/display-slice";
import { addEditColumn, editBoard } from "@/redux/features/kanban-slice";

import {
  ToastError,
  ToastSuccess,
} from "@/components/Animation/Standard/ToastType";

import { WrappedOverlay } from "@/components/Animation/Standard/OverlayType/OverlayType";
import Card from "@/components/Animation/Standard/Card/Card";
import TitleInput from "@/components/Animation/Standard/TitleInput";
import SubInput from "@/components/Animation/Standard/SubInput";
import Button from "@/components/Animation/Standard/Button";

import style from "./AddColumnBoard.module.scss";

interface AddColumnBoardProp extends ComponentProps {
  disableTitle: boolean;
}

const checkForDuplicates = (arr: AddColumns[]) => {
  const columnNames = arr.map((item) => item.columnName);
  const duplicates = columnNames.filter(
    (item, index) => columnNames.indexOf(item) !== index
  );
  if (duplicates.length > 0) return true;

  return false;
};

export default function AddColumnBoard({
  data,
  dispatch,
  disableTitle,
}: AddColumnBoardProp) {
  const closeFormBoard = function (): void {
    // Add Column
    if (disableTitle) {
      dispatch(toggleAddColumnBoard({ showAddColumnBoard: false }));
      return;
    }

    // Edit Board
    dispatch(toggleEditBoard({ showEditBoard: false }));
  };

  const addColumns: AddColumns[] = [];

  const list = data.sideNavList;
  const currentBoard: List | undefined = list.find((li) => li.isActive);

  const formTitle = disableTitle ? "Add New Column" : "Edit Board";
  let boardTitle: string = "";

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
  boardTitle = currentBoard.title;

  const [title, setTitle] = useState<string | undefined>(boardTitle);
  const [subInput, setSubInput] = useState<AddColumns[]>(addColumns);

  const isEmptyTitle = Boolean(title?.trim());

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

    // checking valid title (Only for Edit Board form)
    if (!disableTitle && !isEmptyTitle) {
      ToastError("Name should not be empty");
      setTitle("");
      return;
    }

    // checking if there is any duplicated column name (Only for Add Column form)
    if (checkForDuplicates(columnInputs)) {
      ToastError("Duplicated column name");
      return;
    }

    // for Edit Board & Add Column form
    // Checking if there is any values in the column inputs
    if (!columnInputs.length) {
      ToastError("Atleast one column");
      return;
    }

    if (disableTitle) ToastSuccess("Modify column applied"); // Add Column
    else ToastSuccess("Edited board applied"); // Edit Board

    if (disableTitle) {
      // Add Column redux method
      dispatch(
        addEditColumn({
          newColumn: columnInputs,
        })
      );
    } else {
      // Edit Board redux method
      dispatch(
        editBoard({
          newTitle: title,
          newColumn: columnInputs,
        })
      );
    }

    closeFormBoard();
  };

  return (
    <WrappedOverlay onClose={closeFormBoard}>
      <Card onClose={closeFormBoard}>
        <div
          className={style.addColumn}
          // Preventing to disappear the AddTask since the overlay is wrapped
          onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
        >
          <h2>{formTitle}</h2>

          <form autoComplete="off" onSubmit={handlerSubmit}>
            <TitleInput
              title="Name"
              className={`${style.addColumn__title} ${
                disableTitle && style.addColumn__titleHide
              } ${!isEmptyTitle && style.addColumn__errorTitle}`}
              disabled={disableTitle}
              onChange={setTitle}
              value={title}
            />

            <div
              className={`${style.addColumn__subtask} ${
                !columnInputs.length && style.addColumn__error
              }`}
            >
              <span>Columns</span>

              <AnimatePresence initial={false}>
                {subInput.map((subtask: AddColumns, i: number) => (
                  <div key={i}>
                    <SubInput
                      className={`${style["addColumn__subtask--input"]} ${
                        !subtask.columnName.trim().length &&
                        style["addColumn__subtask--error"]
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
                className={style["addColumn__subtask--insert"]}
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
