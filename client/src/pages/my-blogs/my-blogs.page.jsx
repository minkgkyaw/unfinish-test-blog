import React from "react";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";

const MyBlogsPage = ({user}) => {
  if(!user) return <Navigate to={'/login'} replace />
  return (
    <motion.div
      initial={{
        x: "-10vw",
        opacity: 0,
      }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        type: "spring",
        duration: 1,
        stiffness: 80,
        bounce: 0.6,
      }}
    >
      MyBlogsPage
    </motion.div>
  );
};

export default MyBlogsPage;
