import { motion, useAnimation } from "framer-motion";
import { ClickAnimated } from "../Animation";

// Only used for ModalTask Component
export default function CheckboxLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  const controls = useAnimation();

  const animatedClick = function () {
    controls.start(ClickAnimated);
  };

  return (
    <motion.label
      onClick={animatedClick}
      initial={{ scale: 1 }}
      animate={controls}
    >
      {/* subTask checkbox input */}
      {children}
    </motion.label>
  );
}
