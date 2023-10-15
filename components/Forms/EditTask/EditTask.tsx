import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ComponentProps, SubTasks, List } from "@/types";

import { toggleEditTask } from "@/redux/features/display-slice";

import { findItem, findCurrentColumns } from "@/Utils/taskMethods";

import { WrappedOverlay } from "@/components/Animation/Standard/OverlayType/OverlayType";
import Card from "@/components/Animation/Standard/Card/Card";
import TitleInput from "@/components/Animation/Standard/TitleInput";
import DescriptionInput from "@/components/Animation/Standard/DescriptionInput";
import SubInput from "@/components/Animation/Standard/SubInput";
import DropStatus from "@/components/Animation/Standard/DropStatus/DropStatus";
import Button from "@/components/Animation/Standard/Button";

import style from "./EditTask.module.scss";

interface EditTaskProps extends ComponentProps {
  targetTaskId: string | null;
}

export default function EditTask({
  data,
  dispatch,
  targetTaskId,
}: EditTaskProps) {
  const closeEditTask = function (): void {
    dispatch(
      toggleEditTask({
        showEditTask: {
          display: false,
          targetTaskId: null,
        },
      })
    );
  };

  const list = data.sideNavList;
  const currentBoard: List | undefined = list.find((li) => li.isActive);

  const getColumn = findCurrentColumns({ currentBoard, targetTaskId });
  const getItem = findItem({
    currentBoard,
    currentColumn: getColumn,
    targetTaskId,
  });

  let boardColumns: string[] = [];
  if (currentBoard) boardColumns = Object.keys(currentBoard.columns);

  let currentColumn: string | null = null;
  if (getColumn) currentColumn = getColumn;

  const [title, setTitle] = useState<string | undefined>(getItem?.itemTitle);
  const [description, setDescription] = useState<string | undefined>(
    getItem?.description
  );
  const [subtasks, setSubtasks] = useState<SubTasks[] | undefined>(
    getItem?.subTasks
  );

  let subtasksLength: number = 0;
  if (subtasks) subtasksLength = subtasks.length;

  const subtasksBtn: string =
    subtasksLength >= 5 ? "Only 5 Subtask" : "Add New Subtask";

  const [status, setStatus] = useState<string | null>(currentColumn);
  // displaying the status dropdown
  const [showStatus, setShowStatus] = useState<boolean>(false);

  const addSubtask = function () {
    if (!subtasks) return;

    // adding a new subtask value
    setSubtasks([...subtasks, { subTitle: "", isComplete: false }]);
  };

  const removeSubtask = (index: number) => {
    if (!subtasks || subtasks.length === 1) return;

    // removing the subtask input value
    subtasks.splice(index, 1);
    setSubtasks(subtasks);
  };

  const handleSubtaskChange = (index: number, value: string) => {
    if (!subtasks) return;

    // updating the specific subtask subTitle value
    const updatedSubtasks = subtasks.map((subtask, i) =>
      i === index ? { ...subtask, subTitle: value } : subtask
    );
    setSubtasks(updatedSubtasks);
  };

  const changeStatusHandler = function (newStatus: string): void {
    // if ever the user click the active status again
    if (status === newStatus) return;

    setStatus(newStatus);
  };

  const handlerSubmit = function (e: React.FormEvent): void {
    e.preventDefault();

    console.log(title);
    console.log(description);
    console.log(subtasks);
    console.log(status);
  };

  return (
    <WrappedOverlay onClose={closeEditTask}>
      <Card onClose={closeEditTask}>
        <div
          className={style.editTask}
          // Preventing to disappear the AddTask since the overlay is wrapped
          onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
        >
          <h2>Edit Task</h2>

          <form autoComplete="off" onSubmit={handlerSubmit}>
            <TitleInput
              className={style.editTask__title}
              onChange={setTitle}
              value={title}
            />

            <DescriptionInput
              className={style.editTask__description}
              onChange={setDescription}
              value={description}
            />

            <div className={style.editTask__subtask}>
              <span>Subtasks</span>

              <AnimatePresence initial={false}>
                {subtasks?.map((subtask, i) => (
                  <SubInput
                    key={i}
                    className={style["editTask__subtask--input"]}
                    value={subtask.subTitle}
                    onChange={(e) => handleSubtaskChange(i, e.target.value)}
                    removeSubInput={removeSubtask}
                    index={i}
                  />
                ))}
              </AnimatePresence>

              <Button
                type="button"
                className={style["editTask__subtask--insert"]}
                onClick={addSubtask}
                disabled={subtasksLength >= 5}
              >
                {subtasksBtn}
              </Button>
            </div>

            <div className={style.editTask__status}>
              <span>Status</span>

              <DropStatus
                columnsKeys={boardColumns}
                shown={showStatus}
                setShown={setShowStatus}
                status={status}
                changeStatusHandler={changeStatusHandler}
              />
            </div>

            <Button type="submit" className={style.editTask__submit}>
              Create Task
            </Button>
          </form>
        </div>
      </Card>
    </WrappedOverlay>
  );
}
