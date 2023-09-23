import { motion } from "framer-motion";
import { ShowStatusAnimated } from "./Animation";
import { colors } from "@clerk/themes/dist/clerk-js/src/ui/foundations/colors";
// Add New Task Form, status dropdown
export const ShowStatus = function ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  //   const [shown, setShown] = useState(false);

  return (
    <motion.div>
      <span>Status</span>
      <motion.ul
        variants={ShowStatusAnimated}
        initial="exit"
        // animate={shown ? "enter" : "exit"}
        // className=""
      >
        {/* <motion.li
          whileHover={{
            color: "#000",
            x: 1,
          }}
        >
          Column Title
        </motion.li> */}
      </motion.ul>
    </motion.div>
  );
};
