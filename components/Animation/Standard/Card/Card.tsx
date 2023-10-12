import Image from "next/image";
import { motion } from "framer-motion";
import { OpenAnimated } from "../../Animation";

import style from "./Card.module.scss";
import remove from "../../../../public/assets/icon-cross.svg";

export default function Card({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <motion.div
      className={style.card}
      initial="hidden"
      animate="enter"
      exit="hidden"
      variants={OpenAnimated}
    >
      <div className={style.card__close}>
        <button onClick={onClose}>
          <Image src={remove} alt="" width={15} height={15} />
        </button>
      </div>

      {children}
    </motion.div>
  );
}
