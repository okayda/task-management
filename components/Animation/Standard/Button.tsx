import { motion, useAnimation } from "framer-motion";
import { ClickAnimated } from "../Animation";

interface ButtonProps {
  children: React.ReactNode;
  type: "button" | "reset" | "submit" | undefined;
  className: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({
  children,
  type,
  className,
  onClick,
  disabled = false,
}: ButtonProps) {
  const controls = useAnimation();

  const animatedClick = () => {
    controls.start(ClickAnimated);
    if (onClick) onClick();
  };

  return (
    <motion.button
      type={type}
      className={className}
      onClick={animatedClick}
      initial={{ scale: 1 }}
      animate={controls}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}
