import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
const Circle = ({ delay, color }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  // Animation variants
  const circleVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  // Animation options
  const circleTransition = { delay, duration: 0.5, ease: "easeOut" };

  return (
    <motion.div
      className={`coloredcircles circle${color}`}
      variants={circleVariants}
      initial="hidden"
      animate={controls}
      transition={circleTransition}
    />
  );
};
export default Circle;
