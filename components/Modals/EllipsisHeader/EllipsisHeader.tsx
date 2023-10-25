// import { SignedIn, SignOutButton } from "@clerk/nextjs";
// import Image from "next/image";
// import { usePathname, useRouter } from "next/navigation";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/provider/store";
import {
  toggleEditBoard,
  toggleDeleteBoard,
  toggleHeaderEllipModal,
} from "@/redux/features/display-slice";

import logOutImg from "../../../public/assets/icon-logout.svg";

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

      {/* <SignedIn>
        <SignOutButton signOutCallback={() => router.push("/sign-in")}>
          <div className={style.ellipsisHeader__logout}>
            <Image src={logOutImg} alt="" width={20} height={20} />
            <p>Logout</p>
          </div>
        </SignOutButton>
      </SignedIn> */}
    </div>
  );
}
