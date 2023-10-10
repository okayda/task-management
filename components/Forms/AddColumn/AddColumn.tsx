import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ComponentProps, List } from "@/types";
import { WrappedOverlay } from "@/components/Animation/Standard/OverlayType/OverlayType";
import { toggleAddColumn } from "@/redux/features/display-slice";

import { addColumn } from "@/redux/features/kanban-slice";

import SubInput from "@/components/Animation/Standard/SubInput";

import Button from "@/components/Animation/Standard/Button";
import style from "./AddColumn.module.scss";

export default function AddColumn({ data, dispatch }: ComponentProps) {
  const closeAddColumn = function (): void {
    dispatch(toggleAddColumn({ showAddColumn: false }));
  };

  const list = data.sideNavList;
  const currentBoard: List | undefined = list.find((li) => li.isActive);

  let keysColumn: string[] | null = null;
  if (currentBoard) keysColumn = Object.keys(currentBoard?.columns);

  const [subInputs, setInputs] = useState<string[]>(keysColumn || []);

  const addInput = function () {
    setInputs([...subInputs, ""]);
  };

  const removeInput = (index: number) => {
    if (subInputs.length === 1) return;

    const updatedSubtasks = [...subInputs];
    updatedSubtasks.splice(index, 1);
    setInputs(updatedSubtasks);
  };

  const handleSubtaskChange = (i: number, value: string) => {
    const updatedSubtasks = [...subInputs];
    updatedSubtasks[i] = value;
    setInputs(updatedSubtasks);
  };

  const handlerSubmit = function (e: React.FormEvent) {
    e.preventDefault();

    console.log(subInputs);

    // dispatch(addColumn({
    //   updatedColumn: subInputs,
    // }))
  };

  return (
    <WrappedOverlay onClose={closeAddColumn}>
      <div
        className={style.addcolumn}
        // Preventing to disappear the AddTask since the overlay is wrapped
        onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
      >
        <h2>Add New Column</h2>

        <form autoComplete="off" onSubmit={handlerSubmit}>
          <div className={style.addcolumn__name}>
            <span>Name</span>
            <p>Platform Launch</p>
          </div>

          <div className={style.addcolumn__subInput}>
            <span>Columns</span>

            <AnimatePresence initial={false}>
              {subInputs.map((subtask, i) => (
                <div key={i}>
                  <SubInput
                    className={style["addcolumn__subInput--input"]}
                    value={subtask}
                    onChange={(e) => handleSubtaskChange(i, e.target.value)}
                    removeSubInput={removeInput}
                    index={i}
                  />
                </div>
              ))}
            </AnimatePresence>

            <Button
              type="button"
              className={style["addcolumn__subInput--insert"]}
              onClick={addInput}
            >
              Add New Column
            </Button>
          </div>

          <Button type="submit" className={style.addcolumn__submit}>
            Save Changes
          </Button>
        </form>
      </div>
    </WrappedOverlay>
  );
}
