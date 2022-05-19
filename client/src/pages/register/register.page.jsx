import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ErrorMessage, FastField, Form, Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import {
  registerUserAction,
  cleanUpRegisterAction,
} from "../../redux/actions/registerUser.action";
import * as yup from "yup";
import "./register.styles.scss";
import { useTranslation } from "react-i18next";
import { FaUser, FaLock } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import { ImSpinner6 } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterPage = () => {
  const { t } = useTranslation("register");

  const dispatch = useDispatch();

  const { user: authUser } = useSelector(({ authUser }) => authUser);

  const {
    error,
    loading,
    message: successMessage,
  } = useSelector(({ registerUser }) => registerUser);

  const navigate = useNavigate();

  useEffect(() => {
    authUser && navigate("/");
    successMessage &&
      setTimeout(() => {
        navigate("/login");
      }, 3000);
  }, [authUser]);

  const validationSchema = yup.object().shape({
    name: yup
      .string(t("name-string"))
      .min(3, t("name-min"))
      .max(60, t("name-min"))
      .required(t("name-required")),
    email: yup
      .string(t("email-string"))
      .email(t("email-email"))
      .required(t("email-required")),
    password: yup
      .string(t("password-string"))
      .min(6, t("password-min"))
      .max(60, t("password-max"))
      .required(t("password-required")),
    confirmPassword: yup
      .string(t("confirm-password-string"))
      .min(6, t("confirm-password-min"))
      .max(60, t("confirm-password-max"))
      .required(t("confirm-password-required"))
      .oneOf([yup.ref("password"), null], t("confirm-password-match")),
  });
  const onSubmit = (value) => {
    dispatch(registerUserAction(value));
  };
  return (
    <motion.div
      initial={{
        x: "-10vw",
        opacity: 0,
        overflow: "hidden",
      }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        type: "spring",
        duration: 1,
        stiffness: 80,
        bounce: 0.6,
      }}
      className="register-container"
    >
      <p className="register-title">{t("title")}</p>
      <div className="register-form">
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
                    <span className="text-red-500  text-lg tracking-wider">
                      {error && t(error.message)}
                    </span>
                    <span className="text-orange-500  text-lg tracking-wider">
                      {loading && t("loading message")}
                    </span>
                    <span className="text-green-500 font-bold text-lg tracking-wider">
                      {successMessage && t("register success")}
                    </span>
                  </p>
                </div>
                <Form className="form">
                  <div className="form-group">
                    <div className="form-control">
                      <label className="label" htmlFor="name">
                        <span>
                          <FaUser size={22} />
                        </span>
                        <span>{t("name")} :</span>
                      </label>
                      <FastField
                        className={"input"}
                        name="name"
                        id="name"
                        type="text"
                        placeholder="your name"
                      />
                    </div>
                    <ErrorMessage className={""} name="name" component={"p"} />
                  </div>
                  <div className="form-group">
                    <div className="form-control">
                      <label className="label" htmlFor="email">
                        <span>
                          <MdEmail size={22} />
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
                  <div className="form-group">
                    <div className="form-control">
                      <label className="label" htmlFor="confirmPassword">
                        <span>
                          <FaLock size={22} />
                        </span>
                        <span>{t("confirm-password")} :</span>
                      </label>
                      <FastField
                        className={"input"}
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="password"
                        type="password"
                      />
                    </div>
                    <ErrorMessage
                      className={""}
                      name="confirmPassword"
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
                    <div className="login">
                      <p>{t("or")}</p>
                      <Link to="/login">{t("login")}</Link>
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

export default RegisterPage;
