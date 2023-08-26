import style from "./Header.module.scss";
import Link from "next/link";
import Image from "next/image";
import logoMobile from "../../public/assets/logo-mobile.svg";
import logoNameDark from "../../public/assets/logo-dark.svg";
import logoNameLight from "../../public/assets/logo-light.svg";
import arrowDown from "../../public/assets/icon-chevron-down.svg";

import plusImg from "../../public/assets/plus.svg";
import ellipImg from "../../public/assets/icon-vertical-ellipsis.svg";

export default function Header({ theme }: { theme: boolean }) {
  // false => Light theme
  // true => Dark theme
  const logoName = !theme ? logoNameDark : logoNameLight;

  return (
    <header className={style.header}>
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
            <button className={style["header__sub--cross"]}>
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
