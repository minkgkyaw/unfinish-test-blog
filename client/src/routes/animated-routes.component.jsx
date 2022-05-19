import React, { lazy, Suspense, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./routes.styles.scss";
import NotFoundPage from "../pages/404/notFound.pages";
// import { userProfileAction } from "../redux/actions/userProfile.action";
import jwtDecode from "jwt-decode";
import { fetchUserAction } from "../redux/actions/fetchUser.action";
import { logOutAction } from "../redux/actions/loginUser.action";

const Header = lazy(() => import("../components/header/header.component"));
const LoginPage = lazy(() => import("../pages/login/login.page"));
const BlogsPage = lazy(() => import("../pages/blogs/blogs.page"));
const MyBlogsPage = lazy(() => import("../pages/my-blogs/my-blogs.page"));
const BookmarksPage = lazy(() => import("../pages/bookmarks/bookmarks.page"));
const CreateBlogPage = lazy(() =>
  import("../pages/create-blog/create-blog.page")
);
const RegisterPage = lazy(() => import("../pages/register/register.page"));

const AnimatedRoutes = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.loginUser);
  const { loading, user, error } = useSelector((state) => state.userProfile);

  useEffect(() => {
    console.log(token);
  }, [token]);
  return loading ? (
    <h1>Loading...</h1>
  ) : error ? (
    <h1>{error}</h1>
  ) : (
    <AnimatePresence>
      <Header />
      <Routes location={location} key={location.pathname}>
        <Route
          index
          path="/"
          element={
            <Suspense fallback={"loading ..."}>
              <BlogsPage user={user} />
            </Suspense>
          }
        />
        <Route path="/my_blogs" element={<MyBlogsPage user={user} />} />
        <Route path="/my_bookmarks" element={<BookmarksPage user={user} />} />
        <Route path="/create_blogs" element={<CreateBlogPage user={user} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
