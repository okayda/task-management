import { useState } from "react";
import Switch from "react-switch";
import Image from "next/image";
import style from "./SideNav.module.scss";

import boardWhite from "../../public/assets/icon-board-white.svg";
import boardBlue from "../../public/assets/icon-board-blue.svg";
import boardGray from "../../public/assets/icon-board-gray.svg";
import dark from "../../public/assets/icon-dark-theme.svg";
import light from "../../public/assets/icon-light-theme.svg";

export default function SideNav() {
  const [isChecked, setChecked] = useState(false);

  const alterIcn = function (isActive: boolean) {
    return isActive ? boardWhite : boardGray;
  };

  // Fake data
  const data = [
    { id: "1", boardName: "Platform Launch", isActive: true },
    { id: "2", boardName: "Marketing Plan", isActive: false },
    { id: "3", boardName: "Roadmap", isActive: false },
  ];

  const onChange = function () {
    setChecked((prev) => !prev);
  };

  return (
    <div className={style.sidenav}>
      <div className={style.sidenav__container}>
        {/* TODO Add length of drag boards */}
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

          <li>
            <button>
              <Image src={boardBlue} alt="" width={16} height={16} />
              Create New Brand
            </button>
          </li>
        </ul>

        <div className={style.sidenav__switch}>
          <Image src={dark} alt="" width={16} height={16} />
          <Switch
            onChange={onChange}
            checked={isChecked}
            width={46}
            height={22}
            onColor="#635fc7"
            offColor="#635fc7"
          />
          <Image src={light} alt="" width={19} height={19} />
        </div>
      </div>
    </div>
  );
}
