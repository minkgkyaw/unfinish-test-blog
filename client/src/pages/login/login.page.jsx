import { ErrorMessage, FastField, Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { FaUser, FaLock } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import { ImSpinner6 } from "react-icons/im";
import { loginAction } from "../../redux/actions/loginUser.action";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import "./login.styles.scss";
import { useEffect } from "react";

const initialValues = {
  email: "",
  password: "",
};

const LoinPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [t] = useTranslation("login");
  const { loading, token, error } = useSelector(({ loginUser }) => loginUser);

  useEffect(() => {
    token && navigate(-1);
  }, [token]);

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

  const onSubmit = (value, otherProps) => {
    dispatch(loginAction(value));
    return token && otherProps.resetForm();
  };

  return (
    <motion.div
      initial={{
        x: "-10vw",
        opacity: 0.2,
        overflow: "hidden",
      }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        type: "spring",
        duration: 0.6,
        stiffness: 80,
        bounce: 0.6,
      }}
      className="login-container"
    >
      <p className="login-title">{t("title")}</p>
      <div className="login-form">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => {
            return (
              <div className="form-container">
                <div className="display-box">
                  <p className="text-center">
                    <span className="text-red-500  text-lg tracking-wider first-letter:capitalize">
                      {error && ( error.message ? t(error.message) : t('error'))}
                    </span>
                    <span className="text-orange-500  text-lg tracking-wider">
                      {loading && t("loading message")}
                    </span>
                  </p>
                </div>
                <Form className="form">
                  <div className="form-group">
                    <div className="form-control">
                      <label className="label" htmlFor="email">
                        <span>
                          <FaUser size={22} />
                        </span>
                        <span>{t("email")} :</span>
                      </label>
                      <FastField
                        className={"input"}
                        name="email"
                        id="email"
                        type="email"
                        placeholder="example@mail.com"
                      />
                    </div>
                    <ErrorMessage className={""} name="email" component={"p"} />
                  </div>
                  <div className="form-group">
                    <div className="form-control">
                      <label className="label" htmlFor="password">
                        <span>
                          <FaLock size={22} />
                        </span>
                        <span>{t("password")} :</span>
                      </label>
                      <FastField
                        className={"input"}
                        name="password"
                        id="password"
                        type="password"
                        placeholder="password"
                      />
                    </div>
                    <ErrorMessage
                      className={""}
                      name="password"
                      component={"p"}
                    />
                  </div>

                  <div className="action">
                    <button
                      className="submit"
                      type="submit"
                      disabled={!formik.dirty || !formik.isValid || loading}
                    >
                      {loading ? (
                        <>
                          <span className="animate-spin">
                            <ImSpinner6 size={22} />
                          </span>
                          <span>{t("loading")}</span>
                        </>
                      ) : (
                        <>
                          <span>{t("submit")}</span>
                          <span>
                            <AiOutlineSend size={22} />
                          </span>
                        </>
                      )}
                    </button>
                    <div className="register">
                      <p>{t("or")}</p>
                      <Link to="/register">{t("register")}</Link>
                    </div>
                  </div>
                </Form>
              </div>
            );
          }}
        </Formik>
      </div>
    </motion.div>
  );
};

export default LoinPage;
