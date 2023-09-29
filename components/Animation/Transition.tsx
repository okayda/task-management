import Image from "next/image";
import { motion } from "framer-motion";
import { ShowStatusAnimated, ScaleAnimated, Fade } from "./Animation";
import arrowDown from "../../public/assets/icon-chevron-down.svg";

interface ShowStatusProps {
  columnsKeys: string[];
  shown: boolean;
  setShown: React.Dispatch<React.SetStateAction<boolean>>;
  status: string;
  changeStatusHandler: (prev: string) => void;
  classStatusBtn: string;
  classStatuList: string;
}

// Only used for AddTask Form
export const ShowStatus = function ({
  columnsKeys,
  shown,
  setShown,
  status,
  changeStatusHandler,
  classStatusBtn,
  classStatuList,
}: ShowStatusProps) {
  return (
    <>
      <button
        type="button"
        className={classStatusBtn}
        onClick={() => setShown((prev: boolean) => !prev)}
      >
        {status}
        <Image src={arrowDown} alt="" width={10} height={7} />
      </button>

      <motion.ul
        className={classStatuList}
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
    </>
  );
};

// Only used for AddTask Form
export const SubTaskInput = function ({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: any) => void;
}) {
  return (
    <motion.input
      variants={ScaleAnimated}
      initial="hidden"
      animate="enter"
      exit="exit"
      type="text"
      value={value}
      onChange={onChange}
    />
  );
};

export const OverlayFade = function ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className: string;
  onClick: () => void;
}) {
  return (
    <motion.div
      className={className}
      onClick={onClick}
      key={className}
      variants={Fade}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};
