import Image from "next/image";

import { ComponentProps } from "@/types";

import { toggleDeleteBoard } from "@/redux/features/display-slice";
import { deleteBoard } from "@/redux/features/kanban-slice";

import { ToastSuccess } from "@/components/Animation/Standard/ToastType";

import { WrappedOverlay } from "@/components/Animation/Standard/OverlayType/OverlayType";
import Card from "@/components/Animation/Standard/Card/Card";

import infoImg from "../../../public/assets/icon-info.svg";

import style from "./DeleteModal.module.scss";

interface DeleteTaskProps extends ComponentProps {
  title: string | undefined;
  targetBoardId: string | null;
}

export default function DeleteBoard({
  data,
  dispatch,
  title,
  targetBoardId,
}: DeleteTaskProps) {
  const closeDeleteBoard = function (): void {
    dispatch(
      toggleDeleteBoard({
        showDeleteBoard: {
          display: false,
          title: undefined,
          targetBoardId: null,
        },
      })
    );
  };

  const handlerDeleteBoard = function (): void {
    ToastSuccess("Deleted board");

    dispatch(
      deleteBoard({
        targetBoardId,
      })
    );

    closeDeleteBoard();
  };

  return (
    <WrappedOverlay onClose={closeDeleteBoard}>
      <Card onClose={closeDeleteBoard}>
        <div
          className={style.delete}
          // Preventing to disappear the AddTask since the overlay is wrapped
          onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
        >
          <h2>Delete this board?</h2>

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
              onClick={handlerDeleteBoard}
            >
              Delete
            </button>

            <button
              className={style["delete__btn--secondary"]}
              onClick={closeDeleteBoard}
            >
              Cancel
            </button>
          </div>
        </div>
      </Card>
    </WrappedOverlay>
  );
}
