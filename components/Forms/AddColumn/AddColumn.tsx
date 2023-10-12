import Image from "next/image";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { AnimatePresence } from "framer-motion";
import { ComponentProps, List, KeysColumn } from "@/types";

import { toggleAddColumn } from "@/redux/features/display-slice";
import { addColumn } from "@/redux/features/kanban-slice";

import { WrappedOverlay } from "@/components/Animation/Standard/OverlayType/OverlayType";
import Card from "@/components/Animation/Standard/Card/Card";
import SubInput from "@/components/Animation/Standard/SubInput";
import Button from "@/components/Animation/Standard/Button";

import style from "./AddColumn.module.scss";

export default function AddColumn({ data, dispatch }: ComponentProps) {
  const closeAddColumn = function (): void {
    dispatch(toggleAddColumn({ showAddColumn: false }));
  };

  const list = data.sideNavList;
  const currentBoard: List | undefined = list.find((li) => li.isActive);

  let keysColumn: KeysColumn[] = [];

  // responsible for initializing the existed columns to the subInputs
  if (!currentBoard) return;

  for (const [key, value] of Object.entries(currentBoard.columns)) {
    keysColumn.push({
      columnId: value.columnId,
      columnName: key,
      isNew: false,
    });
  }

  const [subInputs, setInputs] = useState<KeysColumn[]>(keysColumn || []);

  const columnsLength = subInputs.length;
  const addColumnBtn = columnsLength >= 5 ? "Only 5 Columns" : "Add New Column";

  const addInput = function () {
    setInputs([
      ...subInputs,
      { columnId: uuidv4(), columnName: "", isNew: true },
    ]);
  };

  const removeInput = (index: number) => {
    if (subInputs.length === 1) return;

    const updatedSubtasks = [...subInputs];
    updatedSubtasks.splice(index, 1);
    setInputs(updatedSubtasks);
  };

  const handleSubtaskChange = (i: number, value: string) => {
    const updatedSubtasks: KeysColumn[] = [...subInputs];
    updatedSubtasks[i].columnName = value;
    setInputs(updatedSubtasks);
  };

  const handlerSubmit = function (e: React.FormEvent) {
    e.preventDefault();

    dispatch(
      addColumn({
        newColumn: subInputs,
      })
    );
  };

  return (
    <WrappedOverlay onClose={closeAddColumn}>
      <Card onClose={closeAddColumn}>
        <div
          className={style.addcolumn}
          // Preventing to disappear the AddTask since the overlay is wrapped
          onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
        >
          {/* <div className={style.addcolumn__close}>
          <button onClick={closeAddColumn}>
            <Image src={remove} alt="" width={15} height={15} />
          </button>
        </div> */}

          <h2>Add New Column</h2>

          <form autoComplete="off" onSubmit={handlerSubmit}>
            <div className={style.addcolumn__name}>
              <span>Name</span>
              <p>Platform Launch</p>
            </div>

            <div className={style.addcolumn__subInput}>
              <span>Columns</span>

              <AnimatePresence initial={false}>
                {subInputs.map((subtask: KeysColumn, i: number) => (
                  <div key={i}>
                    <SubInput
                      className={style["addcolumn__subInput--input"]}
                      value={subtask.columnName}
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
                disabled={columnsLength >= 5}
              >
                {addColumnBtn}
              </Button>
            </div>

            <Button type="submit" className={style.addcolumn__submit}>
              Save Changes
            </Button>
          </form>
        </div>
      </Card>
    </WrappedOverlay>
  );
}
