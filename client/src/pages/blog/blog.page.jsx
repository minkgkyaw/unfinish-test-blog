import React from "react";
import { motion } from "framer-motion";

const BlogPage = () => {
  return (
    <motion.div
      initial={{
        x: "-10vw",
        opacity: 0,
      }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", duration: 1, stiffness: 80, bounce: 0.5 }}
      className="w-full h-full overflow-hidden grid grid-cols-12"
    >
      <div>test1</div>
      <div>test2</div>
      <div>test3</div>
      <div>test4</div>
      <div>test5</div>
      <div>test6</div>
      <div>test7</div>
    </motion.div>
  );
};

export default BlogPage;
