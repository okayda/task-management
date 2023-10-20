import Image from "next/image";

import { ComponentProps } from "@/types";

import { toggleDeleteTask } from "@/redux/features/display-slice";
import { deleteTask } from "@/redux/features/kanban-slice";

import { ToastSuccess } from "@/components/Animation/Standard/ToastType";

import { WrappedOverlay } from "@/components/Animation/Standard/OverlayType/OverlayType";
import Card from "@/components/Animation/Standard/Card/Card";

import infoImg from "../../../public/assets/icon-info.svg";

import style from "./DeleteModal.module.scss";

interface DeleteTaskProps extends ComponentProps {
  title: string | undefined;
  targetTaskId: string | null;
  targetColumn: string | null;
}

export default function DeleteTask({
  data,
  dispatch,
  title,
  targetTaskId,
  targetColumn,
}: DeleteTaskProps) {
  const closeDeleteTask = function (): void {
    dispatch(
      toggleDeleteTask({
        showDeleteTask: {
          display: false,
          title: undefined,
          targetTaskId: null,
          targetColumn: null,
        },
      })
    );
  };

  const handlerDeleteTask = function (): void {
    ToastSuccess("Deleted");

    dispatch(
      deleteTask({
        targetTaskId,
        targetColumn,
      })
    );

    closeDeleteTask();
  };

  return (
    <WrappedOverlay onClose={closeDeleteTask}>
      <Card onClose={closeDeleteTask}>
        <div
          className={style.delete}
          // Preventing to disappear the AddTask since the overlay is wrapped
          onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
        >
          <h2>Delete this task?</h2>

          <span className={style.delete__subTitle}>
            Are you sure you want to delete the:
          </span>

          <p>{title}</p>

          <div className={style.delete__info}>
            <span>
              This action will remove all columns and tasks and cannot be
              reversed.
            </span>

            <Image src={infoImg} alt="" width={35} height={35} />
          </div>

          <div className={style.delete__btn}>
            <button
              className={style["delete__btn--primary"]}
              onClick={handlerDeleteTask}
            >
              Delete
            </button>

            <button
              className={style["delete__btn--secondary"]}
              onClick={closeDeleteTask}
            >
              Cancel
            </button>
          </div>
        </div>
      </Card>
    </WrappedOverlay>
  );
}
