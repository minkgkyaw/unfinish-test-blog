// import React from "react";
// import { useTranslation } from "react-i18next";
// import "./login.styles.scss";

// const LoinPage = () => {
//   const [t] = useTranslation("login");
//   return (
//     <div className="login-container">
//       <p className="mx-auto text-center font-play font-bold md:text-xl">
//         {t("title")}
//       </p>
//     </div>
//   );
// };

// export default LoinPage;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { authUserAction } from "../../redux/actions/authUser.action.js";
import { ErrorMessage, FastField, Form, Formik } from "formik";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { FaUserAlt } from "react-icons/fa";
import { BsShieldLockFill } from "react-icons/bs";
import { MdSend } from "react-icons/md";
import {
  AiFillWarning,
  AiFillCheckCircle,
  AiOutlineForm,
  AiOutlineCloudServer,
} from "react-icons/ai";
import { BiError } from "react-icons/bi";
import { RiErrorWarningLine, RiTrafficLightLine } from "react-icons/ri";
import { ImSpinner3 } from "react-icons/im";
import { MdAddAlert, MdOutlineError } from "react-icons/md";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { Link, useNavigate, Navigate } from "react-router-dom";
import Countdown from "react-countdown";

import "./login.styles.scss";

const initialValues = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.authUser);

  const navigate = useNavigate();

  useEffect(() => {
    user && navigate(-1);
  }, [user]);

  const [t] = useTranslation("login");

  const validationSchema = yup.object().shape({
    email: yup
      .string(t("email-string"))
      .email(t("email-email"))
      .required(t("email-required")),
    password: yup
      .string(t("password-string"))
      .min(6, t("password-min"))
      .max(60, t("password-max"))
      .required(t("password-required")),
  });

  const onSubmit = (value, { resetForm, setSubmitting }) => {
    dispatch(authUserAction(value));
    setSubmitting(false);
    return user && resetForm();
  };

  return (
    !user && (
      <motion.div
        initial={{
          x: "-100vw",
          opacity: 0.2,
        }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", duration: 1, stiffness: 80, bounce: 0.5 }}
        className="login-container"
      >
        <h1 className="title">{t("title")}</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            // console.log(formik);
            return (
              <Form className="form h-96">
                <div className="login-action-group">
                  {error && (
                    <p className="mx-auto text-red-500 font-play font-bold text-lg flex text-center items-center space-x-4">
                      <span>
                        <BiError size={28} />
                      </span>
                      <span>{t(error.message)}</span>
                    </p>
                  )}
                  <div className="form-group">
                    <label htmlFor="email" className="label">
                      <p className="text-slate-700 dark:text-slate-200">
                        <FaUserAlt />
                      </p>
                      <p className="text-slate-700 dark:text-slate-200">
                        {t("email")}:
                      </p>
                    </label>
                    <FastField
                      type={"email"}
                      id={"email"}
                      name={"email"}
                      className={"input"}
                    />
                    <ErrorMessage
                      name="email"
                      component={"p"}
                      className="error-message"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="label">
                      <p className="text-slate-700 dark:text-slate-200">
                        <BsShieldLockFill />
                      </p>
                      <p className="text-slate-700 dark:text-slate-200">
                        {t("password")}:
                      </p>
                    </label>
                    <FastField
                      type={"password"}
                      id={"password"}
                      name={"password"}
                      className={"input"}
                    />
                    <ErrorMessage
                      name="password"
                      component={"p"}
                      className="error-message"
                    />
                  </div>

                  <div className="form-action">
                    <div className="register-action">
                      <p>{t("or")}</p>
                      <Link to={"/register"}>{t("register")}</Link>
                    </div>
                    <button
                      disabled={
                        !formik.isValid || loading || !formik.dirty || user
                      }
                      type="submit"
                      className="submit-btn"
                    >
                      <span>Submit</span>
                      <i>
                        <MdSend />
                      </i>
                    </button>
                  </div>
                </div>
                <div className="login-status-group">
                  <div className="form-status">
                    <div className="status-title">
                      <AiOutlineForm size={20} />
                      <p>{t("form-status")}</p>
                    </div>
                    {(!formik.dirty || !formik.isValid) && (
                      <div className="alert-box">
                        <AiFillWarning className="text-orange-400" size={18} />
                        <p>{t("all-fields")}</p>
                      </div>
                    )}
                    <div className="alert-box">
                      {!formik.dirty ? (
                        <>
                          <AiFillWarning
                            className="text-orange-400"
                            size={18}
                          />
                          <p>{t("dirty-email")}</p>
                        </>
                      ) : formik.errors.email ? (
                        <>
                          <RiErrorWarningLine
                            className="text-red-500"
                            size={18}
                          />
                          <p>{t("unValidated-email")}</p>
                        </>
                      ) : (
                        <>
                          <AiFillCheckCircle
                            className="text-green-600"
                            size={18}
                          />
                          <p>{t("validated-email")}</p>
                        </>
                      )}
                    </div>
                    <div className="alert-box">
                      {!formik.dirty ? (
                        <>
                          <AiFillWarning
                            className="text-orange-400"
                            size={18}
                          />
                          <p>{t("dirty-password")}</p>
                        </>
                      ) : formik.errors.password ? (
                        <>
                          <RiErrorWarningLine
                            className="text-red-500"
                            size={18}
                          />
                          <p>{t("unValidated-password")}</p>
                        </>
                      ) : (
                        <>
                          <AiFillCheckCircle
                            className="text-green-600"
                            size={18}
                          />
                          <p>{t("validated-password")}</p>
                        </>
                      )}
                    </div>
                    {formik.dirty && formik.isValid && (
                      <div className="alert-box">
                        <AiFillCheckCircle
                          className="text-green-600"
                          size={18}
                        />
                        <p>{t("ready")}</p>
                      </div>
                    )}
                  </div>
                  <div className="server-status">
                    <div className="status-title">
                      <AiOutlineCloudServer size={20} />
                      <p>{t("server-status")}</p>
                    </div>
                    {loading ? (
                      <>
                        <div className="alert-box">
                          <ImSpinner3
                            className="text-green-600 animate-spin"
                            size={18}
                          />
                          <p>{t("loading")}</p>
                        </div>
                      </>
                    ) : error ? (
                      <div className="alert-box">
                        <MdOutlineError
                          className="text-red-600 rotate-180"
                          size={18}
                        />
                        <p className="error">
                          {error.message ? t(error.message) : error}
                        </p>
                      </div>
                    ) : user ? (
                      <>
                        <div className="alert-box">
                          <BsFillCheckSquareFill
                            className="text-green-600"
                            size={18}
                          />
                          <p className="text-gray-800">{t("login-success")}</p>
                        </div>
                        <div className="alert-box">
                          <BsFillCheckSquareFill
                            className="text-green-600"
                            size={18}
                          />
                          <p className="text-gray-800">
                            {t("welcome-user")} {user.name}
                          </p>
                        </div>
                        <div className="alert-box">
                          <BsFillCheckSquareFill
                            className="text-green-600"
                            size={18}
                          />
                          <p className="text-gray-800">
                            {t("redirect")}{" "}
                            <Countdown
                              date={Date.now() + 3000}
                              renderer={({ seconds, completed }) =>
                                completed ? (
                                  navigate(-1)
                                ) : (
                                  <span>{seconds}</span>
                                )
                              }
                            />
                            {t("seconds")}
                          </p>
                        </div>
                      </>
                    ) : !formik.isValid || !formik.dirty ? (
                      <div className="alert-box">
                        <MdAddAlert className="text-orange-600" size={18} />
                        <p className="text-orange-500">
                          {t("server-initial-status")}
                        </p>
                      </div>
                    ) : (
                      <div className="alert-box">
                        <RiTrafficLightLine
                          className="text-yellow-600 animate-bounce"
                          size={18}
                        />
                        <p>{t("waiting")}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </motion.div>
    )
  );
};

export default LoginPage;
