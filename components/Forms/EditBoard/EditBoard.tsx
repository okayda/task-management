import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ComponentProps, List } from "@/types";

import { toggleEditBoard } from "@/redux/features/display-slice";

import {
  ToastError,
  ToastSuccess,
} from "@/components/Animation/Standard/ToastType";

import { WrappedOverlay } from "@/components/Animation/Standard/OverlayType/OverlayType";
import Card from "@/components/Animation/Standard/Card/Card";
import TitleInput from "@/components/Animation/Standard/TitleInput";
import SubInput from "@/components/Animation/Standard/SubInput";
import Button from "@/components/Animation/Standard/Button";

import style from "./EditBoard.module.scss";

export default function EditBoard({ data, dispatch }: ComponentProps) {
  const closeEditBoard = function () {
    dispatch(toggleEditBoard({ showEditBoard: false }));
  };

  const list = data.sideNavList;
  const currentBoard: List | undefined = list.find((li) => li.isActive);

  let currTitle: string = "";
  let columnKeys: string[] = [];

  if (currentBoard) {
    currTitle = currentBoard.title;
    columnKeys = Object.keys(currentBoard?.columns);
  }

  const [title, setTitle] = useState<string | undefined>(currTitle);
  const [subInputs, setSubInputs] = useState<string[]>(columnKeys);

  const isEmptyTitle = Boolean(title?.trim());

  let subInputsLength: number = 0;
  if (subInputs) subInputsLength = subInputs.length;

  const subInputBtn: string =
    subInputsLength >= 5 ? "Only 5 Columns" : "Add New Column";

  const addInput = function () {
    // adding a new subInput value
    setSubInputs([...subInputs, ""]);
  };

  const removeSubInput = function (posIndex: number) {
    // removing the subInput value
    const updatedSubInputs = [...subInputs];
    updatedSubInputs.splice(posIndex, 1);

    setSubInputs(updatedSubInputs);
  };

  const handleSubInputChange = function (posIndex: number, value: string) {
    // updating the specific subtask subTitle value
    const updatedSubInputs: string[] = [...subInputs];
    updatedSubInputs[posIndex] = value;
    setSubInputs(updatedSubInputs);
  };

  const handlerSubmit = function (e: React.FormEvent): void {
    e.preventDefault();

    // Error toast notification
    if (!isEmptyTitle) {
      ToastError("Name should not be empty");
      setTitle("");
      return;
    }

    // remove white spaces & empty input
    // convert into an object
    const columnInputs: string[] = subInputs
      .filter((value: string) => value.trim())
      .map((value: string) => value.trim());

    console.log(title);
    console.log(columnInputs);
  };

  return (
    <WrappedOverlay onClose={closeEditBoard}>
      <Card onClose={closeEditBoard}>
        <div
          className={style.editBoard}
          // Preventing to disappear the AddTask since the overlay is wrapped
          onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
        >
          <h2>Edit Board</h2>

          <form autoComplete="off" onSubmit={handlerSubmit}>
            <TitleInput
              title="Name"
              className={`${style.editBoard__title} ${
                !isEmptyTitle && style.editBoard__errorTitle
              }`}
              onChange={setTitle}
              value={title}
            />

            <div className={style.editBoard__subtask}>
              <span>Columns</span>

              <AnimatePresence initial={false}>
                {subInputs?.map((subInput, i) => (
                  <SubInput
                    key={i}
                    className={`${style["editBoard__subtask--input"]} ${
                      !subInput.trim().length &&
                      style["editBoard__subtask--error"]
                    }`}
                    value={subInput}
                    onChange={(e) => handleSubInputChange(i, e.target.value)}
                    removeSubInput={removeSubInput}
                    index={i}
                  />
                ))}
              </AnimatePresence>

              <Button
                type="button"
                className={style["editBoard__subtask--insert"]}
                onClick={addInput}
                disabled={subInputsLength >= 5}
              >
                {subInputBtn}
              </Button>
            </div>

            <Button type="submit" className={style.editBoard__submit}>
              Save Changes
            </Button>
          </form>
        </div>
      </Card>
    </WrappedOverlay>
  );
}
