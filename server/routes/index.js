import { Router } from "express";

import authRoutes from "./authRoutes.js";
import usersRoutes from "./usersRoutes.js";
import postRoutes from "./postsRoutes.js";

const router = Router();

const routesApi = (app) => {
  app.use("/api/v1", router);

  router.use("/auth", authRoutes);
  router.use("/users", usersRoutes);
  router.use("/posts", postRoutes);
};

export default routesApi;
