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
  .then(async () => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    const usersCount = await User.countDocuments();
    const postsCount = await Post.countDocuments();

    if (usersCount === 0 && postsCount === 0) {
      // Cargar datos iniciales solo si no hay usuarios ni publicaciones en la base de datos
      await User.insertMany(users);
      await Post.insertMany(posts);
      console.log("Initial data added successfully.");
    }
  })
  .catch((error) => {
    console.log(`Did not connect: ${error}`);
  });
