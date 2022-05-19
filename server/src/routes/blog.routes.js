const express = require("express");
const { createBlog, getAllBlog } = require("../controller/blog.controller");
const { uploadImage } = require("../utilities/upload");
const {createBlogValidator} = require('../utilities/validator')

const router = express.Router();

router.route("/").post(uploadImage.fields([{name: 'coverImage', maxCount:1}, {name: 'imageGallery', maxCount: 8}]),createBlogValidator,  createBlog).get(getAllBlog)

module.exports = router;
