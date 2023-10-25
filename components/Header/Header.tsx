"use client";

import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/provider/store";
import { List } from "@/types";

import {
  toggleAddTask,
  toggleMobileNav,
  toggleHeaderEllipModal,
} from "@/redux/features/display-slice";

import { addEllipsis } from "@/Utils/utils";

import EllipsisHeader from "../Modals/EllipsisHeader/EllipsisHeader";

import logoMobile from "../../public/assets/logo-mobile.svg";
import logoNameDark from "../../public/assets/logo-dark.svg";
import logoNameLight from "../../public/assets/logo-light.svg";
import arrowDown from "../../public/assets/icon-chevron-down.svg";
import ellipImg from "../../public/assets/icon-vertical-ellipsis.svg";
import plusImg from "../../public/assets/plus.svg";

import style from "./Header.module.scss";

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();

  const kanbanData = useAppSelector((state) => state.kanbanReducer.data);

  const list = kanbanData.sideNavList;
  const currentBoard: List | undefined = list.find((li) => li.isActive);
  const boardTitle = currentBoard?.title;
  const boardsLength = list.length;

  const titleBoard = currentBoard?.title;
  const targetBoardId = currentBoard?.titleId;

  let title: string | undefined = "";
  if (boardTitle) title = addEllipsis(boardTitle);

  const { showHeaderEllipModal } = useAppSelector(
    (state) => state.displayReducer.data
  );

  // false => Light theme
  // true => Dark theme
  const theme = useAppSelector((state) => state.kanbanReducer.data.isDarkTheme);
  const currentTheme = !theme ? "light" : "dark";
  const logoName = !theme ? logoNameDark : logoNameLight;

  const handlerHeaderEllipModal = function (): void {
    dispatch(
      toggleHeaderEllipModal({ showHeaderEllipModal: !showHeaderEllipModal })
    );
  };

  const showNewTask = function (): void {
    dispatch(toggleAddTask({ showAddTask: true }));
  };

  const openMobileNav = function (): void {
    dispatch(toggleMobileNav({ showMobileNav: true }));
  };

  return (
    <header className={`${style.header} ${currentTheme}`}>
      <div className={style.header__container}>
        <div className={style.header__logo}>
          <picture>
            <source srcSet={logoName.src} media="(min-width: 768px)" />
            <Image
              priority={true}
              src={logoMobile}
              alt="Logo"
              width={24}
              height={24}
            />
          </picture>
        </div>
        <div className={style.header__menu}>
          {/* <div className={style.header__account}>
            <UserButton afterSignOutUrl="/sign-in" />
          </div> */}

          <button className={style.header__launch} onClick={openMobileNav}>
            {title}
            <Image src={arrowDown} alt="" width={10} height={7} />
          </button>

          {boardsLength > 0 && (
            <div className={style.header__sub}>
              <button
                className={style["header__sub--cross"]}
                onClick={showNewTask}
              >
                <span>Add New Task</span>
                <Image alt="" src={plusImg} width={20} height={20} />
              </button>

              <button
                className={style["header__sub--ellip"]}
                onClick={handlerHeaderEllipModal}
              >
                <Image src={ellipImg} alt="" width={5} height={20} />
              </button>

              {showHeaderEllipModal && (
                <EllipsisHeader
                  title={titleBoard}
                  targetBoardId={targetBoardId}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
