import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  isEdited: { type: Boolean, default: false },
});

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  description: String,
  picturePath: { type: String, ref: "Image" },
  likes: {
    type: Map,
    of: Boolean,
  },
  comments: [commentSchema],
});

const Post = mongoose.model("Post", postSchema);

export default Post;
