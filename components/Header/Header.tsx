"use client";

import { useState } from "react";
import Image from "next/image";

import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/provider/store";
import { toggleAddTask } from "@/redux/features/display-slice";
import { toggleMobileNav } from "@/redux/features/display-slice";
import { List } from "@/types";

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

  // false => Light theme
  // true => Dark theme
  const theme = useAppSelector((state) => state.kanbanReducer.data.isDarkTheme);
  const currentTheme = !theme ? "light" : "dark";
  const logoName = !theme ? logoNameDark : logoNameLight;

  const [ellip, setEllip] = useState<boolean>(false);

  const toggleEllipModal = function (): void {
    setEllip((prev) => !prev);
  };

  const closeEllipModal = function (): void {
    setEllip(false);
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

            <Image src={logoMobile} alt="Logo" width={24} height={24} />
          </picture>
        </div>
        <div className={style.header__menu}>
          <button className={style.header__launch} onClick={openMobileNav}>
            {boardTitle}
            <Image src={arrowDown} alt="" width={10} height={7} />
          </button>

          {boardsLength > 0 && (
            <div className={style.header__sub}>
              <button
                className={style["header__sub--cross"]}
                onClick={showNewTask}
              >
                <span>Add New Task</span>
                {/* this img is only for mobile layout */}
                <Image alt="" src={plusImg} width={20} height={20} />
              </button>

              <button onClick={toggleEllipModal}>
                <Image src={ellipImg} alt="" width={5} height={20} />
              </button>

              {ellip && (
                <EllipsisHeader
                  closeEllipModal={closeEllipModal}
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
