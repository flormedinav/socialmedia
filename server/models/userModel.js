import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, min: 2, max: 50 },
    lastName: { type: String, required: true, min: 2, max: 50 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 6 },
    picture: String,
    location: String,
    occupation: String,
    isPrivate: { type: Boolean, default: false },
    friendRequestsReceived: [
      { type: mongoose.Schema.Types.ObjectId, ref: "FriendRequest" },
    ],
    friendRequestsSent: [
      { type: mongoose.Schema.Types.ObjectId, ref: "FriendRequest" },
    ],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
