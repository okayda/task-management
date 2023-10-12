import Image from "next/image";
import style from "./TaskItem.module.scss";

import { useState } from "react";
import { ComponentProps, SubTasks, List } from "@/types";

import { findItem, findCurrentColumns } from "./taskItemMethods";

import { WrappedOverlay } from "@/components/Animation/Standard/OverlayType/OverlayType";
import Card from "@/components/Animation/Standard/Card/Card";
import CheckboxLabel from "@/components/Animation/Standard/CheckboxLabel";
import DropStatus from "@/components/Animation/Standard/DropStatus/DropStatus";

import { toggleModalTask } from "@/redux/features/display-slice";
import {
  updateSubTasksItem,
  updateStatusItem,
} from "@/redux/features/kanban-slice";

import Ellipsis from "../Ellipsis/Ellipsis";
import ellipImg from "../../../public/assets/icon-vertical-ellipsis.svg";

interface ModalTaskProps extends ComponentProps {
  targetTaskId: string | null;
}

export default function ModalTask({
  data,
  dispatch,
  targetTaskId,
}: ModalTaskProps) {
  const list = data.sideNavList;
  const currentBoard: List | undefined = list.find((li) => li.isActive);

  const [ellip, setEllip] = useState<boolean>(false);

  const showEllipModal = function (): void {
    setEllip((prev) => !prev);
  };

  const closeModalTask = function (): void {
    dispatch(
      toggleModalTask({
        showModalTask: {
          display: false,
          targetTaskId: null,
        },
      })
    );
  };

  const getColumn = findCurrentColumns({ currentBoard, targetTaskId });
  const getItem = findItem({
    currentBoard,
    currentColumn: getColumn,
    targetTaskId,
  });

  let boardColumns: string[] = [];
  let currentColumn: string | null = null;

  // get the columns keys needed for displaying in the status dropdown
  // get the current column
  if (currentBoard) boardColumns = Object.keys(currentBoard.columns);
  if (getColumn) currentColumn = getColumn;

  const title = getItem?.itemTitle;

  const description = getItem?.description;

  const completedSubTasks = getItem?.subTasks.filter(
    (item) => item.isComplete
  ).length;
  const lengthSubTasks = getItem?.subTasks.length;
  const subTasks: SubTasks[] | undefined = getItem?.subTasks;

  const status: string | null = currentColumn;
  const [showStatus, setShowStatus] = useState<boolean>(false);

  const checkboxHandler = (index: number) => {
    if (!subTasks) return;

    const copySubTasks = [...subTasks];

    copySubTasks[index] = { ...copySubTasks[index] };
    copySubTasks[index].isComplete = !copySubTasks[index].isComplete;

    dispatch(
      updateSubTasksItem({
        targetTaskId,
        updatedSubTasks: copySubTasks,
        targetColumn: currentColumn,
      })
    );
  };

  // changing the status position of the Task item
  const changeStatusHandler = function (newStatus: string): void {
    // if ever the user click the active status
    if (status === newStatus) return;

    dispatch(
      updateStatusItem({
        targetTaskId,
        currColumn: status,
        newColumn: newStatus,
      })
    );
  };

  // subTasks className
  const toggleCheck = function (isComplete: boolean): string {
    return isComplete ? "modaltask__subtasks--checked" : "modaltask__subtasks";
  };

  return (
    <WrappedOverlay onClose={closeModalTask}>
      <Card onClose={closeModalTask}>
        <div
          className={style.modaltask}
          // Preventing to disappear the AddTask since the overlay is wrapped
          onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
        >
          <div className={style.modaltask__title}>
            <h2>{title}</h2>

            <button
              onClick={showEllipModal}
              className={style["modaltask__title--ellipsis"]}
            >
              <Image src={ellipImg} alt="" width={5} height={20} />
            </button>

            {ellip && <Ellipsis />}
          </div>

          <p>{description}</p>

          <div className={style.modaltask__subtasks}>
            <span>
              Subtask ( {completedSubTasks} of {lengthSubTasks} )
            </span>

            {lengthSubTasks ? (
              <ul>
                {subTasks?.map((li: SubTasks, i: number) => (
                  <li key={li.subTitle}>
                    <CheckboxLabel
                      className={style[toggleCheck(li.isComplete)]}
                    >
                      <input
                        type="checkbox"
                        checked={li.isComplete}
                        onChange={() => checkboxHandler(i)}
                      />
                      {li.subTitle}
                    </CheckboxLabel>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No subtasks</p>
            )}
          </div>

          <div>
            <span>Current Status</span>

            <DropStatus
              columnsKeys={boardColumns}
              shown={showStatus}
              setShown={setShowStatus}
              status={status}
              changeStatusHandler={changeStatusHandler}
            />
          </div>
        </div>
      </Card>
    </WrappedOverlay>
  );
}
