const mongoose = require("mongoose")

const postSchema = new mongoose.Schema(
  {
    user:{
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    caption: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    public_id:{
        type: String
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)


module.exports = mongoose.model("Post", postSchema)


