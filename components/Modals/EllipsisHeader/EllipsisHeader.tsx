import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/provider/store";
import {
  toggleEditBoard,
  toggleDeleteBoard,
  toggleHeaderEllipModal,
} from "@/redux/features/display-slice";

import style from "./EllipsisHeader.module.scss";

export default function EllipsisHeader({
  title,
  targetBoardId,
}: {
  title: string | undefined;
  targetBoardId: string | undefined;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const closeHeaderEllipModal = function (): void {
    dispatch(toggleHeaderEllipModal({ showHeaderEllipModal: false }));
  };

  const showEditBoard = function (): void {
    closeHeaderEllipModal();

    dispatch(toggleEditBoard({ showEditBoard: true }));
  };

  const showDeleteBoard = function (): void {
    closeHeaderEllipModal();

    dispatch(
      toggleDeleteBoard({
        showDeleteBoard: { display: true, title, targetBoardId },
      })
    );
  };

  return (
    <div className={style.ellipsisHeader}>
      <button className={style.ellipsisHeader__primary} onClick={showEditBoard}>
        Edit Board
      </button>
      <button
        className={style.ellipsisHeader__secondary}
        onClick={showDeleteBoard}
      >
        Delete Board
      </button>
    </div>
  );
}
