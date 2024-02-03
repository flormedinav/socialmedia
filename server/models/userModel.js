import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, min: 2, max: 50 },
    lastName: { type: String, required: true, min: 2, max: 50 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 6 },
    picturePath: { type: String, ref: "Image" },
    location: String,
    occupation: String,
    viewedProfile: { type: Number, default: 0 },
    impressions: { type: Number, default: 0 },
    isPrivate: { type: Boolean, default: false },
    friendRequestsReceived: [
      { type: mongoose.Schema.Types.ObjectId, ref: "FriendRequest" },
    ],
    friendRequestsSent: [
      { type: mongoose.Schema.Types.ObjectId, ref: "FriendRequest" },
    ],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
