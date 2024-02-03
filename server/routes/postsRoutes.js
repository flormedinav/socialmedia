import { Router } from "express";

import PostsController from "../controllers/postsController.js";
import authorizationMiddleware from "../middlewares/authorizationMiddleware.js";

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
  controllers.createPost
);

// Obtener los likes del post
router.patch(
  "/:userId/:postId/like",
  authorizationMiddleware,
  controllers.likePost
);

// Añadir comentario a un post
router.post(
  "/:userId/:postId/add-comment",
  authorizationMiddleware,
  controllers.addComment
);

// Editar comentario de un post
router.patch(
  "/:userId/:postId/edit-comment/:commentId",
  authorizationMiddleware,
  controllers.editComment
);

// Eliminar comentario de un post
router.delete(
  "/:userId/:postId/delete-comment/:commentId",
  authorizationMiddleware,
  controllers.deleteComment
);

export default router;
