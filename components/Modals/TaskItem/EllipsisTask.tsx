import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/provider/store";
import {
  toggleModalTask,
  toggleDeleteTask,
  toggleEditTask,
} from "@/redux/features/display-slice";

import style from "./EllipsisTask.module.scss";

export default function EllipsisTask({
  title,
  targetTaskId,
  targetColumn,
}: {
  title: string | undefined;
  targetTaskId: string | null;
  targetColumn: string | null;
}) {
  const dispatch = useDispatch<AppDispatch>();

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

  const showDeleteTask = function (): void {
    closeModalTask();

    dispatch(
      toggleDeleteTask({
        showDeleteTask: {
          title,
          display: true,
          targetTaskId,
          targetColumn,
        },
      })
    );
  };

  const showEditTask = function (): void {
    closeModalTask();

    dispatch(
      toggleEditTask({
        showEditTask: {
          display: true,
          targetTaskId: targetTaskId,
        },
      })
    );
  };

  return (
    <div className={style.ellipsisTask}>
      <button className={style.ellipsisTask__primary} onClick={showEditTask}>
        Edit task
      </button>
      <button
        className={style.ellipsisTask__secondary}
        onClick={showDeleteTask}
      >
        Delete task
      </button>
    </div>
  );
}
