import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";

const Backdrop = ({ children, onClick }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      transition: { duration: 0.5 },
    });

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [controls]);

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={controls}
      exit={{ opacity: 0 }}
      className="backdrop"
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
