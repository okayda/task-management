"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

import { ComponentProps, List } from "@/types";

import { WrappedOverlay } from "@/components/Animation/Standard/OverlayType/OverlayType";
import Card from "@/components/Animation/Standard/Card/Card";
import SubInput from "@/components/Animation/Standard/SubInput";
import DropStatus from "@/components/Animation/Standard/DropStatus/DropStatus";

import { toggleAddTask } from "@/redux/features/display-slice";
import { addTask } from "@/redux/features/kanban-slice";

import Button from "../../Animation/Standard/Button";

import remove from "../../../public/assets/icon-cross.svg";
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
    if (subtasks.length === 1) return;

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

    const desc = description.trim() || "No description";

    // Checking if there is any empty items in the subTaks Input
    // If yes will not be included
    const subTasks = subtasks
      .filter((li) => li.trim())
      .map((li) => ({
        subTitle: li.trim(),
        isComplete: false,
      }));

    dispatch(
      addTask({
        formData: {
          itemId: uuidv4(),
          itemTitle: title,
          description: desc,
          subTasks,
        },
        targetColumn: status,
      })
    );
  };

  return (
    <WrappedOverlay onClose={closeAddTask}>
      <Card onClose={closeAddTask}>
        <div
          className={style.addtask}
          // Preventing to disappear the AddTask since the overlay is wrapped
          onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
        >
          <h3>Add New Task</h3>

          <form autoComplete="off" onSubmit={handlerSubmit}>
            <div className={style.addtask__title}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className={style.addtask__description}>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

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
