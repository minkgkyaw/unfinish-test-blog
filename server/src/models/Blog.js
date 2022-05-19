const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      min: 3,
      max: 100,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    postBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    imageGallery: [
      {
        type: String,
      },
    ],
    likes: {
      type: Number,
    },
    comments: {
      type: String,
    },
    softDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        delete ret.__v;
        delete ret._id;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("Blog", schema);
