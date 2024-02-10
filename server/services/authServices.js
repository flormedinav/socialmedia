import bcrypt from "bcrypt";

import User from "../models/userModel.js";
import createAccessToken from "../lib/jwt.js";
import { userWithoutPasswordFunction } from "../helpers/userWithoutPassword.js";
import getMyTotalPosts from "../helpers/getMyTotalPosts.js";
import getMyTotalLikes from "../helpers/getMyTotalLikes.js";

class AuthServices {
  constructor() {}

  async create({
    firstName,
    lastName,
    email,
    password,
    picture,
    location,
    occupation,
  }) {
    try {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);

      const userFound = await User.findOne({ email });

      if (userFound) throw new Error("User is already registered");

      const newUser = new User({
        firstName,
        lastName,
        email,
        password: passwordHash,
        picture,
        location,
        occupation,
      });

      const savedUser = await newUser.save();
      const token = await createAccessToken({ id: savedUser._id });

      const userWithoutPassword = userWithoutPasswordFunction(savedUser);

      return {
        message: "User created",
        data: {
          user: {
            ...userWithoutPassword,
            totalPosts: 0,
            totalLikes: 0,
          },
          token,
        },
      };
    } catch (error) {
      throw new Error(`${error.message || error}`);
    }
  }

  async login({ email, password }) {
    try {
      const user = await User.findOne({ email }).populate("friends");

      if (!user) throw new Error("Unregistered user");

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) throw new Error("Invalid credential");

      const token = await createAccessToken({ id: user._id });

      const totalPosts = await getMyTotalPosts(user._id);
      const totalLikes = await getMyTotalLikes(user._id);

      const userWithoutPassword = userWithoutPasswordFunction(user);

      return {
        message: "User logged in",
        data: {
          user: {
            ...userWithoutPassword,
            totalLikes,
            totalPosts,
          },
          token,
        },
      };
    } catch (error) {
      throw new Error(`${error.message || error}`);
    }
  }
}

export default AuthServices;
