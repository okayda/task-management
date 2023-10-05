import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { ShowStatusAnimated, ScaleAnimated, Fade } from "./Animation";
import arrowDown from "../../public/assets/icon-chevron-down.svg";

import "./Transition.scss";

interface ShowStatusProps {
  columnsKeys: string[];
  shown: boolean;
  setShown: React.Dispatch<React.SetStateAction<boolean>>;
  status: string | null;
  changeStatusHandler: (prev: string) => void;
}

// Only used for AddTask Form
export const ShowStatus = function ({
  columnsKeys,
  shown,
  setShown,
  status,
  changeStatusHandler,
}: ShowStatusProps) {
  return (
    <div className="statusContainer">
      <button
        type="button"
        className="statusBtn"
        onClick={() => setShown((prev: boolean) => !prev)}
      >
        {status}
        <Image src={arrowDown} alt="" width={10} height={7} />
      </button>

      <motion.ul
        className="statusList"
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

// Only used for ModalTask Component
export const SubTasksLabel = function ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  const controls = useAnimation();

  const handleOnClick = () => {
    controls.start({
      scale: [1, 1.25, 1],
      transition: {
        duration: 0.3,
      },
    });
  };

  return (
    <motion.label
      onClick={handleOnClick}
      initial={{ scale: 1 }}
      animate={controls}
    >
      {/* subTask checkbox input */}
      {children}
    </motion.label>
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
