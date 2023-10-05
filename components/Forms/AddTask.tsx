"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

import { ComponentProps, List } from "@/constants/types";

import { WrappedOverlay } from "../OverlayType/OverlayType";

import { toggleAddTask } from "@/redux/features/display-slice";
import { addTask } from "@/redux/features/kanban-slice";

import { ShowStatus, SubTaskInput } from "../Animation/Transition";

import remove from "../../public/assets/icon-cross.svg";

import style from "./AddTask.module.scss";

export default function AddTask({ data, dispatch }: ComponentProps) {
  const closeNav = function (): void {
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

  const addSubtask = () => {
    setSubtasks([...subtasks, ""]);
  };

  const handleSubtaskChange = (index: number, value: string) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index] = value;
    setSubtasks(updatedSubtasks);
  };

  const removeSubtask = (index: number) => {
    if (subtasks.length === 1) return;

    const updatedSubtasks = [...subtasks];
    updatedSubtasks.splice(index, 1);
    setSubtasks(updatedSubtasks);
  };

  const handlerSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const desc = description.trim() || "No description";

    // Checking if there is any empty items in the subTaks Input
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
    <WrappedOverlay onClick={closeNav}>
      <div
        className={style.addtask}
        // Preventing to disappear the AddTask since the overlay is wrapped
        onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
      >
        <div className={style.addtask__close}>
          <button onClick={closeNav}>
            <Image src={remove} alt="" width={15} height={15} />
          </button>
        </div>

        <h3>Add New Task</h3>

        <form autoComplete="off" onSubmit={handlerSubmit}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
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
              {subtasks.map((subtask, index) => (
                <div key={index}>
                  <SubTaskInput
                    value={subtask}
                    onChange={(e) => handleSubtaskChange(index, e.target.value)}
                  />
                  <button type="button" onClick={() => removeSubtask(index)}>
                    <Image src={remove} alt="" width={15} height={15} />
                  </button>
                </div>
              ))}
            </AnimatePresence>

            <button
              type="button"
              className={style["addtask__subtask--insert"]}
              onClick={addSubtask}
            >
              Add New Subtask
            </button>
          </div>

          <div>
            <span>Status</span>

            <ShowStatus
              columnsKeys={boardColumns}
              shown={showStatus}
              setShown={setShowStatus}
              status={status}
              changeStatusHandler={changeStatusHandler}
            />
          </div>

          <button type="submit" className={style.addtask__submit}>
            Create Task
          </button>
        </form>
      </div>
    </WrappedOverlay>
  );
}
