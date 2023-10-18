import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/provider/store";
import { toggleEditBoard } from "@/redux/features/display-slice";

import style from "./EllipsisHeader.module.scss";

export default function EllipsisHeader() {
  const dispatch = useDispatch<AppDispatch>();

  const showEditBoard = function (): void {
    dispatch(toggleEditBoard({ showEditBoard: true }));
  };

  return (
    <div className={style.ellipsisHeader}>
      <button className={style.ellipsisHeader__primary} onClick={showEditBoard}>
        Edit Board
      </button>
      <button className={style.ellipsisHeader__secondary}>Delete Board</button>
    </div>
  );
}
