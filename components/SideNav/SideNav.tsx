"use client";

import Switch from "react-switch";
import Image from "next/image";
import style from "./SideNav.module.scss";

import Overlay from "../Overlay/Overlay";

import boardWhite from "../../public/assets/icon-board-white.svg";
import boardBlue from "../../public/assets/icon-board-blue.svg";
import boardGray from "../../public/assets/icon-board-gray.svg";
import purplePlus from "../../public/assets/purple-plus.svg";
import dark from "../../public/assets/icon-dark-theme.svg";
import light from "../../public/assets/icon-light-theme.svg";
import hideSide from "../../public/assets/icon-hide-sidebar.svg";

import { AppDispatch, useAppSelector } from "@/redux/store";
import { changeTheme } from "@/redux/features/kanban-slice";

export default function SideNav({ dispatch }: { dispatch: AppDispatch }) {
  const theme = useAppSelector((state) => state.kanbanReducer.data.isDarkTheme);

  const handlerTheme = function (): void {
    dispatch(changeTheme({ theme: !theme }));
  };

  const alterIcn = function (isActive: boolean) {
    return isActive ? boardWhite : boardGray;
  };

  // Fake data
  const data = [
    { id: "1", boardName: "Platform Launch", isActive: true },
    { id: "2", boardName: "Marketing Plan", isActive: false },
    { id: "3", boardName: "Roadmap", isActive: false },
  ];

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
              {data.map((board) => {
                // Is used for avoiding the empty className
                const prop: {
                  className?: string;
                } = {};
                if (board.isActive) prop.className = style.sidenav__active;

                return (
                  <li {...prop} key={board.id}>
                    <button>
                      <Image
                        src={alterIcn(board.isActive)}
                        alt=""
                        width={16}
                        height={16}
                      />
                      {board.boardName}
                    </button>
                  </li>
                );
              })}

              <li className={style.createBoard}>
                <button>
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
}
