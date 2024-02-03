import { Router } from "express";

import AuthController from "../controllers/authController.js";

const router = Router();
const controllers = new AuthController();

router.post("/register", controllers.register);
router.post("/login", controllers.login);

export default router;
