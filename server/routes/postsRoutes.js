import { Router } from "express";

import PostsController from "../controllers/postsController.js";
import authorizationMiddleware from "../middlewares/authorizationMiddleware.js";
import userIdMatchMiddleware from "../middlewares/userIdMatchMiddleware .js";

const router = Router();
const controllers = new PostsController();

// Obtener todos los posts
router.get("/:userId", authorizationMiddleware, controllers.getAllPosts);

// Obtener los posts del feed
router.get(
  "/:userId/feed-posts",
  authorizationMiddleware,
  controllers.getFeedPosts
);

// Obtener los posts del user
router.get(
  "/:userId/user-posts",
  authorizationMiddleware,
  controllers.getUserPosts
);

// Crear un nuevo post
router.post(
  "/:userId/new-post",
  authorizationMiddleware,
  userIdMatchMiddleware,
  controllers.createPost
);

// Editar un post
router.patch(
  "/:userId/:postId",
  authorizationMiddleware,
  userIdMatchMiddleware,
  controllers.editPost
);

// Eliminar un post
router.delete(
  "/:userId/:postId",
  authorizationMiddleware,
  userIdMatchMiddleware,
  controllers.deletePost
);

// Dar likes a los posts post
router.patch(
  "/:userId/:postId/like",
  authorizationMiddleware,
  userIdMatchMiddleware,
  controllers.likePost
);

// Añadir comentario a un post
router.post(
  "/:userId/:postId/add-comment",
  authorizationMiddleware,
  userIdMatchMiddleware,
  controllers.addComment
);

// Editar comentario de un post
router.patch(
  "/:userId/:postId/edit-comment/:commentId",
  authorizationMiddleware,
  userIdMatchMiddleware,
  controllers.editComment
);

// Eliminar comentario de un post
router.delete(
  "/:userId/:postId/delete-comment/:commentId",
  authorizationMiddleware,
  userIdMatchMiddleware,
  controllers.deleteComment
);

export default router;
