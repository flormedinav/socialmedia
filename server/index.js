import mongoose from "mongoose";

import app from "./app.js";
import User from "./models/userModel.js";
import Post from "./models/postModel.js";
import { posts, users } from "./data/index.js";

const PORT = process.env.PORT || 6001;

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => {
    console.log(`Did not connect: ${error}`);
  });
