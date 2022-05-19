import React, { useState } from "react";
import { motion } from "framer-motion";
import { fakeBlogs } from "../../data/fake-blog";
import { formatDistance, subDays } from "date-fns";
import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { VscCommentDiscussion } from "react-icons/vsc";
import { BiDotsVertical } from "react-icons/bi";

const BlogsPage = () => {
  const [saveBookmark, setSaveBookMarks] = useState(false);
  const [bookMarkId, setBookMarkId] = useState({});

  const getBookmark = () => setSaveBookMarks(!saveBookmark);
  return (
    <motion.div
      initial={{
        x: "-10vw",
        opacity: 0,
      }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", duration: 0.6, stiffness: 80, bounce: 0.5 }}
      className="max-w-full h-full overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-center align-middle gap-6 py-10 mx-10 "
    >
      {fakeBlogs.map((data) => (
        <div
          key={data.id}
          className={
            "border rounded-lg flex flex-col space-y-5 py-5 justify-center px-3 dark:bg-gradient-to-br from-slate-500 to-slate-600 w-full border-slate-500 bg-slate-100 dark:text-slate-100"
          }
        >
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center space-x-2 ">
              <img
                src="http://localhost:8000/public/avatars/avatar.png"
                className="w-12 h-12 rounded-full"
                alt=""
              />
              <p className="flex flex-col text-sm">
                <span className="capitalize font-poppins">
                  Post by {data.postBy}
                </span>
                <span className="text-slate-500 dark:text-slate-100 text-xs font-poppins">
                  {formatDistance(
                    subDays(new Date(data.createdAt), 0),
                    new Date(),
                    {
                      addSuffix: true,
                    }
                  )}
                </span>
              </p>
            </div>
            <button onClick={() => getBookmark()}>
              {saveBookmark ? (
                <BsBookmarkStarFill size={25} className="cursor-pointer" />
              ) : (
                <BsBookmarkStar size={25} className="cursor-pointer" />
              )}
            </button>
          </div>
          <div className="">
            <h1 className="text-xl text-justify first-letter:uppercase mb-2 font-poppins">
              {data.title}
            </h1>
            <img
              src={data.image}
              alt=""
              className="w-full h-full rounded shadow-lg"
            />
          </div>
          <div className="action flex justify-between items-center py-2 ">
            <div className="like">
              <AiOutlineHeart size={25} />
            </div>
            <div className="comment">
              <VscCommentDiscussion size={25} />
            </div>
            <div className="options">
              <BiDotsVertical size={25} />
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default BlogsPage;
