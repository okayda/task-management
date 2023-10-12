import { motion, useAnimation } from "framer-motion";
import { ClickAnimated } from "../Animation";

// Only used for modal TaskItem Component
export default function CheckboxLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  const controls = useAnimation();

  const animatedClick = function () {
    controls.start(ClickAnimated);
  };

  return (
    <motion.label
      className={className}
      onClick={animatedClick}
      initial={{ scale: 1 }}
      animate={controls}
    >
      {/* subTask checkbox input */}
      {children}
    </motion.label>
  );
}
