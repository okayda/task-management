"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

import { ComponentProps, List } from "@/types";

import { WrappedOverlay } from "@/components/Animation/Standard/OverlayType/OverlayType";
import Card from "@/components/Animation/Standard/Card/Card";
import TitleInput from "@/components/Animation/Standard/TitleInput";
import DescriptionInput from "@/components/Animation/Standard/DescriptionInput";
import SubInput from "@/components/Animation/Standard/SubInput";
import DropStatus from "@/components/Animation/Standard/DropStatus/DropStatus";

import { toggleAddTask } from "@/redux/features/display-slice";
import { addTask } from "@/redux/features/kanban-slice";

import Button from "../../Animation/Standard/Button";

import style from "./AddTask.module.scss";

export default function AddTask({ data, dispatch }: ComponentProps) {
  const closeAddTask = function (): void {
    dispatch(toggleAddTask({ showAddTask: false }));
  };

  const list = data.sideNavList;
  const currentBoard: List | undefined = list.find((li) => li.isActive);

  // get the columns keys needed for displaying in the status dropdown
  let boardColumns: string[] = [];
  if (currentBoard) boardColumns = Object.keys(currentBoard.columns);
  const [status, setStatus] = useState<string>(boardColumns[0]);

  const [showStatus, setShowStatus] = useState<boolean>(false);

  // responsible for changing the value of the dropdown status
  const changeStatusHandler = function (newStatus: string): void {
    setStatus(newStatus);
  };

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [subtasks, setSubtasks] = useState<string[]>([""]);

  const addSubtask = function () {
    setSubtasks([...subtasks, ""]);
  };

  const removeSubtask = (index: number) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks.splice(index, 1);
    setSubtasks(updatedSubtasks);
  };

  const handleSubtaskChange = (index: number, value: string) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index] = value;
    setSubtasks(updatedSubtasks);
  };

  const handlerSubmit = function (e: React.FormEvent) {
    e.preventDefault();

    const desc = description;

    // remove white spaces & empty input
    // convert into an object
    const subTasks = subtasks
      .filter((value: string) => value.trim())
      .map((value: string) => ({
        subTitle: value.trim(),
        isComplete: false,
      }));

    dispatch(
      addTask({
        formData: {
          itemId: uuidv4(),
          itemTitle: title,
          description: desc.trim() || "No description",
          subTasks,
        },
        targetColumn: status,
      })
    );

    closeAddTask();
  };

  return (
    <WrappedOverlay onClose={closeAddTask}>
      <Card onClose={closeAddTask}>
        <div
          className={style.addtask}
          // Preventing to disappear the AddTask since the overlay is wrapped
          onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
        >
          <h2>Add New Task</h2>

          <form autoComplete="off" onSubmit={handlerSubmit}>
            <TitleInput
              className={style.addtask__title}
              onChange={setTitle}
              value={title}
            />

            <DescriptionInput
              className={style.addtask__subtask}
              onChange={setDescription}
              value={description}
            />

            <div className={style.addtask__subtask}>
              <span>Subtasks</span>

              <AnimatePresence initial={false}>
                {subtasks.map((subtask, i) => (
                  <SubInput
                    key={i}
                    className={style["addtask__subtask--input"]}
                    value={subtask}
                    onChange={(e) => handleSubtaskChange(i, e.target.value)}
                    removeSubInput={removeSubtask}
                    index={i}
                  />
                ))}
              </AnimatePresence>

              <Button
                type="button"
                className={style["addtask__subtask--insert"]}
                onClick={addSubtask}
              >
                Add New Subtask
              </Button>
            </div>

            <div className={style.addtask__status}>
              <span>Status</span>

              <DropStatus
                columnsKeys={boardColumns}
                shown={showStatus}
                setShown={setShowStatus}
                status={status}
                changeStatusHandler={changeStatusHandler}
              />
            </div>

            <Button type="submit" className={style.addtask__submit}>
              Create Task
            </Button>
          </form>
        </div>
      </Card>
    </WrappedOverlay>
  );
}
