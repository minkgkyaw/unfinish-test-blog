import React from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import Avatar from "/images/avatar.svg";
import { useSelector, useDispatch } from "react-redux";
import { logOutAction } from "../../redux/actions/loginUser.action";

const NavbarProfile = () => {
  const { user } = useSelector((state) => state.userProfile);
  const dispatch = useDispatch();

  const onLogout = () => dispatch(logOutAction());
  return (
    <div className="relative inline-flex text-left justify-center">
      <button className="relative justify-center w-full rounded-full dark:bg-slate-300 p-2 shadow-lg hover:dark:bg-slate-500 dark:hover:text-red-500">
        <img
          src={
            user
              ? `http://localhost:8000/public/avatars/${user.avatar}`
              : "/images/avatar.svg"
          }
          alt="user image"
          className="w-12 h-12 rounded-full"
          onClick={onLogout}
        />
      </button>
    </div>
  );
};

export default NavbarProfile;
