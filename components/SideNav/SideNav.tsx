"use client";
import React from "react";
import { ComponentProps } from "@/types";

import Switch from "react-switch";
import Image from "next/image";
import style from "./SideNav.module.scss";

import { changeTheme, changeBoard } from "@/redux/features/kanban-slice";
import { toggleAddNewBoard } from "@/redux/features/display-slice";

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

export default React.memo(({ data, dispatch }: ComponentProps) => {
  // id is not valid
  if (!data.userId) return null;

  const { isDarkTheme: theme, sideNavList: list } = data;

  const changeBoardHandler = function (id: string): void {
    dispatch(changeBoard({ titleId: id }));
  };

  const openAddNewBoard = function (): void {
    dispatch(toggleAddNewBoard({ showAddNewBoard: true }));
  };

  const handlerTheme = function (): void {
    dispatch(changeTheme({ theme: !theme }));
  };

  return (
    <>
      {/* {showNav && <Overlay onClose={setShowNav} />} */}
      {/* ${showNav && style.sidenav__mobileShow} */}
      <div className={`${style.sidenav}`}>
        <div className={style.sidenav__container}>
          {/* TODO Add length of drag boards */}
          <div>
            <h3>all boards (3)</h3>
            <ul>
              {/* TODO Add one list of board */}
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
                      {board.title}
                    </button>
                  </li>
                );
              })}

              <li className={style.createBoard}>
                <button onClick={openAddNewBoard}>
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
