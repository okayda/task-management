"use client";

import { useState } from "react";
import Image from "next/image";

import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/provider/store";
import { toggleAddTask } from "@/redux/features/display-slice";

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

  // false => Light theme
  // true => Dark theme
  const theme = useAppSelector((state) => state.kanbanReducer.data.isDarkTheme);
  const currentTheme = !theme ? "light" : "dark";
  const logoName = !theme ? logoNameDark : logoNameLight;

  const [ellip, setEllip] = useState<boolean>(false);

  const showEllipModal = function (): void {
    setEllip((prev) => !prev);
  };

  const handlerNewTask = function (): void {
    dispatch(toggleAddTask({ showAddTask: true }));
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
          <button className={style.header__launch}>
            {/* // TODO: change title if the user click specific board. */}
            Platform Launch
            {/* this img is only for mobile layout */}
            <Image src={arrowDown} alt="" width={10} height={7} />
          </button>

          <div className={style.header__sub}>
            <button
              className={style["header__sub--cross"]}
              onClick={handlerNewTask}
            >
              <span>Add New Task</span>
              {/* this img is only for mobile layout */}
              <Image alt="" src={plusImg} width={20} height={20} />
            </button>

            <button onClick={showEllipModal}>
              <Image src={ellipImg} alt="" width={5} height={20} />
            </button>

            {ellip && <EllipsisHeader />}
          </div>
        </div>
      </div>
    </header>
  );
}
