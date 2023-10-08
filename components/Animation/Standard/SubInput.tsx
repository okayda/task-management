import Image from "next/image";
import { motion } from "framer-motion";
import { ScaleAnimated } from "../Animation";
import remove from "../../../public/assets/icon-cross.svg";

interface SubInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeSubInput: (i: number) => void;
  value: string;
  index: number;
  className: string;
}

export default function SubInput({
  value,
  onChange,
  removeSubInput,
  index,
  className,
}: SubInputProps) {
  return (
    <div className={className}>
      <motion.input
        required
        variants={ScaleAnimated}
        initial="hidden"
        animate="enter"
        exit="exit"
        type="text"
        value={value}
        onChange={onChange}
      />

      <button type="button" onClick={() => removeSubInput(index)}>
        <Image src={remove} alt="" width={15} height={15} />
      </button>
    </div>
  );
}
