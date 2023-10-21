"use client";
import React from "react";
import { AnimatePresence } from "framer-motion";
import { ComponentProps } from "@/types";

import Switch from "react-switch";
import Image from "next/image";
import style from "./SideNav.module.scss";

import { Overlay } from "../Animation/Standard/OverlayType/OverlayType";

import { changeTheme, changeBoard } from "@/redux/features/kanban-slice";
import {
  toggleAddNewBoard,
  toggleMobileNav,
} from "@/redux/features/display-slice";

import { addEllipsis } from "@/Utils/utils";

import boardWhite from "../../public/assets/icon-board-white.svg";
import boardBlue from "../../public/assets/icon-board-blue.svg";
import boardGray from "../../public/assets/icon-board-gray.svg";
import purplePlus from "../../public/assets/purple-plus.svg";
import dark from "../../public/assets/icon-dark-theme.svg";
import light from "../../public/assets/icon-light-theme.svg";
import hideSide from "../../public/assets/icon-hide-sidebar.svg";

const alterIcn = function (isActive: boolean): string {
  return isActive ? boardWhite : boardGray;
};

interface SideNavProps extends ComponentProps {
  showMobileNav: boolean;
}

export default React.memo(({ data, dispatch, showMobileNav }: SideNavProps) => {
  // id is not valid
  if (!data.userId) return null;

  const boardsLength = data.sideNavList.length;

  const { isDarkTheme: theme, sideNavList: list } = data;

  const closeMobileNav = function (): void {
    dispatch(toggleMobileNav({ showMobileNav: false }));
  };

  const changeBoardHandler = function (id: string): void {
    dispatch(changeBoard({ titleId: id }));
  };

  const showAddNewBoard = function (): void {
    dispatch(toggleAddNewBoard({ showAddNewBoard: true }));

    closeMobileNav();
  };

  const handlerTheme = function (): void {
    dispatch(changeTheme({ theme: !theme }));
  };

  return (
    <>
      <AnimatePresence>
        {showMobileNav && <Overlay onClose={closeMobileNav} />}
      </AnimatePresence>

      <div
        className={`${style.sidenav}  ${
          showMobileNav && style.sidenav__mobileShow
        }`}
      >
        <div className={style.sidenav__container}>
          <div>
            <h3>all boards ({boardsLength})</h3>
            <ul>
              {list.map((board) => {
                // Is used for avoiding the empty className
                const prop: {
                  className?: string;
                } = {};
                if (board.isActive) prop.className = style.sidenav__active;

                return (
                  <li {...prop} key={board.titleId}>
                    <button onClick={() => changeBoardHandler(board.titleId)}>
                      <Image
                        src={alterIcn(board.isActive)}
                        alt=""
                        width={16}
                        height={16}
                      />
                      {addEllipsis(board.title)}
                    </button>
                  </li>
                );
              })}

              <li className={style.createBoard}>
                <button onClick={showAddNewBoard}>
                  <Image src={boardBlue} alt="" width={16} height={16} />

                  <div>
                    <Image src={purplePlus} alt="" width={16} height={16} />
                    Create New Brand
                  </div>
                </button>
              </li>
            </ul>
          </div>

          <div className={style.sidenav__btn}>
            <div className={style["sidenav__btn--switch"]}>
              <Image src={dark} alt="" width={16} height={16} />
              <Switch
                onChange={handlerTheme}
                checked={theme}
                width={46}
                height={22}
                onColor="#635fc7"
                offColor="#635fc7"
              />
              <Image src={light} alt="" width={19} height={19} />
            </div>

            <button className={style["sidenav__btn--hide"]}>
              <Image src={hideSide} alt="" width={18} height={16} />
              Hide Sidebar
            </button>
          </div>
        </div>
      </div>
    </>
  );
});
