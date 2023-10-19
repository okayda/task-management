import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/provider/store";
import {
  toggleModalTask,
  toggleDeleteTask,
  toggleEditTask,
} from "@/redux/features/display-slice";

import style from "./EllipsisTask.module.scss";

export default function EllipsisTask({
  targetTaskId,
}: {
  targetTaskId: string | null;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const showDeleteTask = function (): void {
    dispatch(
      toggleModalTask({
        showModalTask: {
          display: false,
          targetTaskId: null,
        },
      })
    );

    dispatch(
      toggleDeleteTask({
        showDeleteTask: {
          display: true,
          targetTaskId: targetTaskId,
        },
      })
    );
  };

  const showEditTask = function (): void {
    dispatch(
      toggleModalTask({
        showModalTask: {
          display: false,
          targetTaskId: null,
        },
      })
    );

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
