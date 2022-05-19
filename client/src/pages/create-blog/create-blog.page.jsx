import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FastField, Form, Formik, ErrorMessage, FieldArray } from "formik";
import { BsUpload } from "react-icons/bs";
import * as yup from "yup";
import "./create-blog-page.styles.scss";

const CreateBlogPage = ({ user }) => {
  if (!user) return <Navigate to={"/login"} replace />;

  const initialValues = {
    title: "",
    description: "",
    coverImage: "",
    imagesGallery: [],
  };

  const validationSchema = yup.object().shape({
    title: yup.string().min(3).max(200).required(),
    description: yup.string().min(3).required(),
    coverImage: yup.mixed().required(),
  });

  const onSubmit = (value) => {
    console.log(value);
  };

  return (
    <motion.div
      initial={{
        x: "-10vw",
        opacity: 0,
      }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", duration: 1, stiffness: 80, bounce: 0.5 }}
      className="create-blog-container"
    >
      <h1 className="title">Create new Blog</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form className="form">
              <div className="form-group ">
                <label htmlFor="title" className="label">
                  Title <span className="text-red-500">*</span>
                </label>
                <FastField name="title" id="title" className="input" required />
                <ErrorMessage
                  component={"p"}
                  name="title"
                  className="error-box"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description" className="label">
                  Description <span className="text-red-500">*</span>
                </label>
                <FastField
                  name="description"
                  id="description"
                  className="input"
                  required
                />
                <ErrorMessage
                  component={"p"}
                  name="description"
                  className="error-box"
                />
              </div>
              <div className="form-group ">
                <label className="label" htmlFor="coverImage">
                  Cover Image <span className="text-red-500">*</span>
                </label>
                <FastField
                  accept="image/*"
                  className="file-input"
                  id="coverImage"
                  name="coverImage"
                  type="file"
                />
                <ErrorMessage
                  component={"p"}
                  name="coverImage"
                  className="error-box"
                />
              </div>
              <div className="form-group">
                <label className="label" htmlFor="imagesGallery">
                  Options Images for gallery{" "}
                  <small className="text-sm">
                    (Up to 8 photos can be uploaded.)
                  </small>
                </label>
                <FastField
                  className="file-input"
                  id="imagesGallery"
                  name="imagesGallery"
                  type="file"
                  accept="image/*"
                  multiple
                />
              </div>
              <button
                type="submit"
                className="submit-btn"
                disabled={!formik.dirty || !formik.isValid}
              >
                <BsUpload size={22} /> <span>Post Now </span>
              </button>
            </Form>
          );
        }}
      </Formik>
    </motion.div>
  );
};

export default CreateBlogPage;
