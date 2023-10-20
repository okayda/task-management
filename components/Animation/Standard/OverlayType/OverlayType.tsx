import { motion } from "framer-motion";
import { FadeAnimated } from "../../Animation";
import style from "./OverlayType.module.scss";

export const Overlay = function ({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className={style.overlay}
      onClick={onClose}
      variants={FadeAnimated}
      initial="hidden"
      animate="visible"
      exit="exit"
    />
  );
};

export const WrappedOverlay = function ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <motion.div
      className={style.wrappedOverlay}
      onClick={onClose}
      variants={FadeAnimated}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};
