import Image from "next/image";
import { motion } from "framer-motion";
import { ShowStatusAnimated } from "../../Animation";
import arrowDown from "../../../../public/assets/icon-chevron-down.svg";
import style from "./DropStatus.module.scss";

interface DropStatusProps {
  columnsKeys: string[];
  shown: boolean;
  setShown: React.Dispatch<React.SetStateAction<boolean>>;
  status: string | null;
  changeStatusHandler: (prev: string) => void;
}

export default function DropStatus({
  columnsKeys,
  shown,
  setShown,
  status,
  changeStatusHandler,
}: DropStatusProps) {
  return (
    <div className={style.status}>
      <button
        type="button"
        className={style.status__btn}
        onClick={() => setShown((prev: boolean) => !prev)}
      >
        {status}
        <Image src={arrowDown} alt="" width={10} height={7} />
      </button>

      <motion.ul
        className={style.status__list}
        variants={ShowStatusAnimated}
        initial="exit"
        animate={shown ? "enter" : "exit"}
      >
        {columnsKeys.map((column: string) => (
          <motion.li key={column}>
            <motion.button
              type="button"
              onClick={() => {
                changeStatusHandler(column);
                setShown(false);
              }}
              whileHover={{
                color: "#635fc7",
                x: 6,
              }}
              style={{ cursor: "pointer" }}
            >
              {column}
            </motion.button>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
