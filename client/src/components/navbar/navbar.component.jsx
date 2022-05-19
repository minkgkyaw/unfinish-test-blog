import React, { useState, useEffect } from "react";
import { Link, NavLink, Navigate } from "react-router-dom";
import "./navbar.styles.scss";
import { useTranslation } from "react-i18next";
import { AiTwotoneSetting } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { logOutAction } from "../../redux/actions/loginUser.action";
import {
  changeThemeToDark,
  changeThemeToLight,
} from "../../redux/actions/theme.action";
import NavbarProfile from "../nav-profile/nav-profile.component";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";

const navLink = ({ isActive }) => {
  return isActive ? "activeLink" : "notActiveLink";
};

const NavBar = () => {
  const [lang, setLang] = useState(localStorage.getItem("i18nextLng"));
  const { token } = useSelector((state) => state.loginUser);
  console.log(token);
  const theme = useSelector((state) => state.theme);

  const dispatch = useDispatch();

  const [t, i18n] = useTranslation("nav");

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <div className="navbar">
      {/* logo */}
      <div className="logo flex md:hidden lg:flex">
        <Link to={"/"}>
          <p className="logo-text">MM-S-K</p>
        </Link>
      </div>
      {/* navigation hide in mobile*/}
      <nav className="navigation">
        <NavLink to={"/"} className={navLink}>
          {t("blogs")}
        </NavLink>
        {token && (
          <>
            <NavLink to={"/my_blogs"} className={navLink}>
              {t("my-blogs")}
            </NavLink>
            <NavLink to={"my_bookmarks"} className={navLink}>
              {t("bookmarks")}
            </NavLink>
            <NavLink to={"/create_blogs"} className={navLink}>
              {t("create")}
            </NavLink>
          </>
        )}
        <NavLink to={"/about"} className={navLink}>
          {t("about")}
        </NavLink>
        {!token && (
          <NavLink to={"/contact"} className={navLink}>
            {t("contact")}
          </NavLink>
        )}
      </nav>
      {/* setting and auth */}
      <div className="setting_and_auth">
        <div className="change_lang_and_change_dark_mode">
          <div className="change_theme ">
            {theme === "light" ? (
              <button
                className="p-2"
                onClick={() => dispatch(changeThemeToDark())}
              >
                <BsFillMoonStarsFill size={22} />
              </button>
            ) : theme === "dark" ? (
              <button
                className="p-2"
                onClick={() => dispatch(changeThemeToLight())}
              >
                <BsFillSunFill size={22} />
              </button>
            ) : (
              <button
                className="p-2"
                onClick={() => dispatch(changeThemeToDark())}
              >
                <BsFillMoonStarsFill size={22} />
              </button>
            )}
          </div>
          <div className="change_lang bg-transparent">
            <select
              defaultValue={lang}
              onChange={(e) => setLang(e.target.value)}
            >
              <option value="en">{t("en")}</option>
              <option value="mm">{t("mm")}</option>
            </select>
          </div>
        </div>
        {/* auth(login/register/logout) */}
        <div className="auth capitalize">
          {!token && (
            <>
              <NavLink to={"/login"} className={navLink}>
                {t("login")}
              </NavLink>
              <p>/</p>
              <NavLink to={"/register"} className={navLink}>
                {t("register")}
              </NavLink>
            </>
          )}
          {token && <NavbarProfile />}
        </div>
      </div>
      {/* mobile */}
      <nav className="mobile md:hidden flex space-x-4">
        <div className="setting">
          <AiTwotoneSetting size={22} />
        </div>
        <p>mobile</p>
      </nav>
    </div>
  );
};

export default NavBar;
