const Blog = require("../models/Blog");
const createHttpError = require("http-errors");
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/User");

const createBlog = expressAsyncHandler(async (req, res, next) => {
  const coverImageArray = req.files.coverImage.map((i) => i.filename);

  const coverImage = coverImageArray[0];
  const imageGallery = req.files.imageGallery.map((i) => i.filename);

  console.log(coverImage);

  try {
    const existedBlog = await Blog.findOne({ title: req.body.title });
    if (existedBlog)
      return next(
        createHttpError(
          400,
          "Blog already existed with this title. Change another content or change title."
        )
      );

    const newBlog = new Blog({
      title: req.body.title,
      description: req.body.description,
      postBy: req.body.postBy,
      coverImage,
      imageGallery,
    });

    const saveBlog = await newBlog.save();

    if (!saveBlog) return next(createHttpError(409, "Can't create a new blog"));

    // save post id in user
    const updateUser = await User.findByIdAndUpdate(req.body.postBy, {
      $push: { posts: saveBlog._id },
    });

    if (!updateUser) {
      await saveBlog.delete();
      return next(createHttpError(409, "Can't add post id in user collection"));
    }

    return res.status(201).json({ blog: saveBlog });
  } catch (err) {
    return next(err);
  }
});

const getAllBlog = expressAsyncHandler(async (req, res, next) => {
  try {
    const blogs = await Blog.find().populate("postBy", "name id posts");

    return res.status(200).json(blogs);
  } catch (err) {
    return next(err);
  }
});

module.exports = {
  createBlog,
  getAllBlog,
};
