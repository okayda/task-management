"use client";

import style from "./Header.module.scss";
import Image from "next/image";
import logoMobile from "../../public/assets/logo-mobile.svg";
import logoNameDark from "../../public/assets/logo-dark.svg";
import logoNameLight from "../../public/assets/logo-light.svg";
import arrowDown from "../../public/assets/icon-chevron-down.svg";

import plusImg from "../../public/assets/plus.svg";
import ellipImg from "../../public/assets/icon-vertical-ellipsis.svg";

import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { toggleNav } from "@/redux/features/display-slice";

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();

  // false => Light theme
  // true => Dark theme
  const theme = useAppSelector((state) => state.kanbanReducer.data.isDarkTheme);
  const currentTheme = !theme ? "light" : "dark";
  const logoName = !theme ? logoNameDark : logoNameLight;

  // only for mobile layout and only way to show the mobile side nav list modal

  const handlerNewTask = function (): void {
    dispatch(toggleNav({ showNav: true }));
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

            <button>
              <Image src={ellipImg} alt="" width={5} height={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
